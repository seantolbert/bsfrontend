// src/hooks/useSnapshotActions.ts
'use client';

import { useSnapshot } from '@/contexts/SnapshotStore';
import type { BoardSnapshot, BoardSize, StripLayout, WoodId } from '@/contexts/SnapshotStore';

export function useSnapshotActions() {
  const { dispatch } = useSnapshot();

  return {
    loadSnapshot: (snap: BoardSnapshot) =>
      dispatch({ type: 'LOAD_SNAPSHOT', payload: snap }),

    setSize: (size: BoardSize) =>
      dispatch({ type: 'SET_SIZE', payload: size }),

    setStripCell: (strip: 'A' | 'B', index: number, wood: WoodId) =>
      dispatch({ type: 'SET_STRIP_CELL', payload: { strip, index, wood } }),

    setStrip: (strip: 'A' | 'B', woods: WoodId[]) =>
      dispatch({ type: 'SET_STRIP', payload: { strip, woods } }),

    moveRow: (from: number, to: number) =>
      dispatch({ type: 'MOVE_ROW', payload: { from, to } }),

    toggleRowReversed: (rowIndex: number) =>
      dispatch({ type: 'TOGGLE_ROW_REVERSED', payload: { rowIndex } }),

    setLayout: (layout: StripLayout[]) =>
      dispatch({ type: 'SET_LAYOUT', payload: layout }),
  };
}
