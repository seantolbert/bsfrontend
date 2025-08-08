"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from "react";

export type BoardSize = "small" | "medium" | "large";
export type WoodId = string | null;
export type StripLayout = { strip: "A" | "B"; reversed: boolean };

export interface BoardSnapshot {
  size: BoardSize;
  strips: { A: WoodId[]; B: WoodId[] };
  layout: StripLayout[];
  createdAt: string;
}

type State = {
  snapshot: BoardSnapshot;
};

type Action =
  | { type: "LOAD_SNAPSHOT"; payload: BoardSnapshot }
  | { type: "SET_SIZE"; payload: BoardSize }
  | {
      type: "SET_STRIP_CELL";
      payload: { strip: "A" | "B"; index: number; wood: WoodId };
    }
  | { type: "SET_STRIP"; payload: { strip: "A" | "B"; woods: WoodId[] } }
  | { type: "MOVE_ROW"; payload: { from: number; to: number } }
  | { type: "TOGGLE_ROW_REVERSED"; payload: { rowIndex: number } }
  | { type: "SET_LAYOUT"; payload: StripLayout[] };

function makeEmptyStrips(size: BoardSize): { A: WoodId[]; B: WoodId[] } {
  const cols = size === "large" ? 15 : 12;
  return { A: Array(cols).fill(null), B: Array(cols).fill(null) };
}
function defaultLayout(size: BoardSize): StripLayout[] {
  const rows = size === "small" ? 10 : size === "large" ? 19 : 14;
  // default ABAB...
  return Array.from({ length: rows }, (_, i) => ({
    strip: i % 2 === 0 ? "A" : "B",
    reversed: false,
  }));
}

const initialSnapshot: BoardSnapshot = {
  size: "medium",
  strips: makeEmptyStrips("medium"),
  layout: defaultLayout("medium"),
  createdAt: new Date().toISOString(),
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_SNAPSHOT": {
      return { snapshot: { ...action.payload } };
    }
    case "SET_SIZE": {
      const size = action.payload;
      const rows = size === "small" ? 10 : size === "large" ? 19 : 14;
      const cols = size === "large" ? 15 : 12;

      // Resize strips
      const resize = (arr: WoodId[]) =>
        arr.length === cols
          ? arr.slice()
          : arr.length > cols
          ? arr.slice(0, cols)
          : [...arr, ...Array(cols - arr.length).fill(null)];

      const newA = resize(state.snapshot.strips.A);
      const newB = resize(state.snapshot.strips.B);

      // Resize layout (preserve existing pattern as much as possible)
      const newLayout =
        state.snapshot.layout.length === rows
          ? state.snapshot.layout.slice()
          : state.snapshot.layout.length > rows
          ? state.snapshot.layout.slice(0, rows)
          : [
              ...state.snapshot.layout,
              ...defaultLayout(size).slice(state.snapshot.layout.length),
            ];

      return {
        snapshot: {
          ...state.snapshot,
          size,
          strips: { A: newA, B: newB },
          layout: newLayout,
        },
      };
    }
    case "SET_STRIP_CELL": {
      const { strip, index, wood } = action.payload;
      const next = { ...state.snapshot.strips };
      const arr = next[strip].slice();
      arr[index] = wood;
      next[strip] = arr;
      return { snapshot: { ...state.snapshot, strips: next } };
    }
    case "SET_STRIP": {
      const { strip, woods } = action.payload;
      return {
        snapshot: {
          ...state.snapshot,
          strips: { ...state.snapshot.strips, [strip]: woods.slice() },
        },
      };
    }
    case "MOVE_ROW": {
      const { from, to } = action.payload;
      if (to < 0 || to >= state.snapshot.layout.length) return state;
      const layout = state.snapshot.layout.slice();
      const [row] = layout.splice(from, 1);
      layout.splice(to, 0, row);
      return { snapshot: { ...state.snapshot, layout } };
    }
    case "TOGGLE_ROW_REVERSED": {
      const { rowIndex } = action.payload;
      const layout = state.snapshot.layout.slice();
      layout[rowIndex] = {
        ...layout[rowIndex],
        reversed: !layout[rowIndex].reversed,
      };
      return { snapshot: { ...state.snapshot, layout } };
    }
    case "SET_LAYOUT": {
      return {
        snapshot: { ...state.snapshot, layout: action.payload.slice() },
      };
    }
    default:
      return state;
  }
}

const SnapshotContext = createContext<{
  snapshot: BoardSnapshot;
  dispatch: React.Dispatch<Action>;
  // selectors
  boardRows: { id: string; color: WoodId }[][];
} | null>(null);

export function SnapshotProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { snapshot: initialSnapshot });

  // Derived rows for the preview (inflated from snapshot)
  const boardRows = useMemo(() => {
    const { strips, layout } = state.snapshot;
    return layout.map(({ strip, reversed }, rowIndex) => {
      const base = strip === "A" ? strips.A : strips.B;
      const arr = reversed ? [...base].reverse() : base;
      return arr.map((color, colIndex) => ({
        id: `${rowIndex}-${colIndex}`,
        color,
      }));
    });
  }, [state.snapshot]);

  return (
    <SnapshotContext.Provider
      value={{ snapshot: state.snapshot, dispatch, boardRows }}
    >
      {children}
    </SnapshotContext.Provider>
  );
}

export function useSnapshot() {
  const ctx = useContext(SnapshotContext);
  if (!ctx)
    throw new Error("useSnapshot must be used within a SnapshotProvider");
  return ctx;
}
