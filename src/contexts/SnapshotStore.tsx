"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";

export type BoardSize = "small" | "medium" | "large";
export type WoodId = string | null;
export type StripKey = "A" | "B" | "C";

export type StripLayout = { strip: StripKey; reversed: boolean };

export interface BoardSnapshot {
  size: BoardSize;
  strips: { A: WoodId[]; B: WoodId[]; C: WoodId[] };
  layout: StripLayout[]; // each item = one “column” in the sideways board
  createdAt: string;
}

type State = { snapshot: BoardSnapshot };
type Action =
  | { type: "LOAD_SNAPSHOT"; payload: BoardSnapshot }
  | { type: "SET_SIZE"; payload: BoardSize }
  | {
      type: "SET_STRIP_CELL";
      payload: { strip: StripKey; index: number; wood: WoodId };
    }
  | { type: "SET_STRIP"; payload: { strip: StripKey; woods: WoodId[] } }
  | { type: "SET_LAYOUT"; payload: StripLayout[] }
  | { type: "MOVE_COLUMN"; payload: { from: number; to: number } }
  | { type: "TOGGLE_COLUMN_REVERSED"; payload: { columnIndex: number } }
  | {
      type: "SET_COLUMN_STRIP";
      payload: { columnIndex: number; strip: StripKey };
    };

function colsFor(size: BoardSize) {
  return size === "large" ? 15 : 12;
}
function rowsFor(size: BoardSize) {
  return size === "small" ? 10 : size === "large" ? 19 : 14;
}

function emptyStrips(size: BoardSize) {
  const n = colsFor(size);
  return {
    A: Array<WoodId>(n).fill(null),
    B: Array<WoodId>(n).fill(null),
    C: Array<WoodId>(n).fill(null),
  };
}
function defaultLayout(size: BoardSize): StripLayout[] {
  // Sideways board: each item in layout is a VERTICAL stack of tiles = a “column”.
  const n = rowsFor(size); // number of columns (previously rows)
  // default cycles A,B,C,A,B,C...
  const cycle: StripKey[] = ["A", "B", "C"];
  return Array.from({ length: n }, (_, i) => ({
    strip: cycle[i % 3],
    reversed: false,
  }));
}

const initial: BoardSnapshot = {
  size: "medium",
  strips: emptyStrips("medium"),
  layout: defaultLayout("medium"),
  createdAt: new Date().toISOString(),
};

function resizeStrip(arr: WoodId[], size: BoardSize) {
  const n = colsFor(size);
  if (arr.length === n) return arr.slice();
  if (arr.length > n) return arr.slice(0, n);
  return [...arr, ...Array<WoodId>(n - arr.length).fill(null)];
}

function reducer(state: State, action: Action): State {
  const snap = state.snapshot;
  switch (action.type) {
    case "LOAD_SNAPSHOT":
      return { snapshot: { ...action.payload } };

    case "SET_SIZE": {
      const size = action.payload;
      // resize strips (columns count)
      const A = resizeStrip(snap.strips.A, size);
      const B = resizeStrip(snap.strips.B, size);
      const C = resizeStrip(snap.strips.C, size);

      // resize layout (number of columns in sideways board = rowsFor(size))
      const target = rowsFor(size);
      let layout = snap.layout.slice();
      if (layout.length > target) layout = layout.slice(0, target);
      if (layout.length < target) {
        const extra = defaultLayout(size).slice(0, target - layout.length);
        layout = [...layout, ...extra];
      }

      return { snapshot: { ...snap, size, strips: { A, B, C }, layout } };
    }

    case "SET_STRIP_CELL": {
      const { strip, index, wood } = action.payload;
      const nextStrips = {
        ...snap.strips,
        [strip]: snap.strips[strip].slice(),
      };
      nextStrips[strip][index] = wood;
      return { snapshot: { ...snap, strips: nextStrips } };
    }

    case "SET_STRIP": {
      const { strip, woods } = action.payload;
      return {
        snapshot: {
          ...snap,
          strips: { ...snap.strips, [strip]: woods.slice() },
        },
      };
    }

    case "SET_LAYOUT":
      return { snapshot: { ...snap, layout: action.payload.slice() } };

    case "MOVE_COLUMN": {
      const { from, to } = action.payload;
      if (to < 0 || to >= snap.layout.length) return state;
      const layout = snap.layout.slice();
      const [col] = layout.splice(from, 1);
      layout.splice(to, 0, col);
      return { snapshot: { ...snap, layout } };
    }

    case "TOGGLE_COLUMN_REVERSED": {
      const { columnIndex } = action.payload;
      const layout = snap.layout.slice();
      layout[columnIndex] = {
        ...layout[columnIndex],
        reversed: !layout[columnIndex].reversed,
      };
      return { snapshot: { ...snap, layout } };
    }

    case "SET_COLUMN_STRIP": {
      const { columnIndex, strip } = action.payload;
      const layout = snap.layout.slice();
      layout[columnIndex] = { ...layout[columnIndex], strip };
      return { snapshot: { ...snap, layout } };
    }

    default:
      return state;
  }
}

const Ctx = createContext<{
  snapshot: BoardSnapshot;
  dispatch: React.Dispatch<Action>;
  // derived: grid built SIDEWAYS (columns = layout length, rows = column tiles)
  grid: { id: string; color: WoodId }[][]; // grid[col][row]
} | null>(null);

export function SnapshotProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { snapshot: initial });

  const grid = useMemo(() => {
    const { layout, strips, size } = state.snapshot;
    const rows = colsFor(size); // number of tiles PER column (width of strip)
    const cols = layout.length; // number of columns (sideways)
    // Build per column (x) then per row (y)
    return Array.from({ length: cols }, (_, colIndex) => {
      const { strip, reversed } = layout[colIndex];
      const source = strips[strip];
      const columnTiles = reversed ? [...source].reverse() : source;
      return Array.from({ length: rows }, (_, rowIndex) => ({
        id: `${colIndex}-${rowIndex}`,
        color: columnTiles[rowIndex] ?? null,
      }));
    });
  }, [state.snapshot]);

  return (
    <Ctx.Provider value={{ snapshot: state.snapshot, dispatch, grid }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSnapshot() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSnapshot must be used within SnapshotProvider");
  return ctx;
}
