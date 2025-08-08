"use client";
import { useSnapshot } from "@/contexts/SnapshotStore";
import type {
  BoardSnapshot,
  BoardSize,
  StripKey,
  StripLayout,
  WoodId,
} from "@/contexts/SnapshotStore";

export function useSnapshotActions() {
  const { dispatch } = useSnapshot();
  return {
    loadSnapshot: (snap: BoardSnapshot) =>
      dispatch({ type: "LOAD_SNAPSHOT", payload: snap }),
    setSize: (size: BoardSize) => dispatch({ type: "SET_SIZE", payload: size }),
    setStripCell: (strip: StripKey, index: number, wood: WoodId) =>
      dispatch({ type: "SET_STRIP_CELL", payload: { strip, index, wood } }),
    setStrip: (strip: StripKey, woods: WoodId[]) =>
      dispatch({ type: "SET_STRIP", payload: { strip, woods } }),
    setLayout: (layout: StripLayout[]) =>
      dispatch({ type: "SET_LAYOUT", payload: layout }),
    moveColumn: (from: number, to: number) =>
      dispatch({ type: "MOVE_COLUMN", payload: { from, to } }),
    toggleColumnReversed: (columnIndex: number) =>
      dispatch({ type: "TOGGLE_COLUMN_REVERSED", payload: { columnIndex } }),
    setColumnStrip: (columnIndex: number, strip: StripKey) =>
      dispatch({ type: "SET_COLUMN_STRIP", payload: { columnIndex, strip } }),
  };
}
