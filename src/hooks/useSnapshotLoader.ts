'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBoardBuilder } from '@/contexts/BoardBuilderContext';

export function useSnapshotLoader() {
  const params = useSearchParams();
  const snapshotParam = params.get('snapshot');

  const {
    setBoardSize,
    setStripA,
    setStripB,
    setLayout,
  } = useBoardBuilder();

  useEffect(() => {
    if (!snapshotParam) return;

    try {
      const decoded = decodeURIComponent(snapshotParam);
      const snapshot = JSON.parse(decoded);

      const { size, strips, layout } = snapshot;

      setBoardSize(size || 'medium');
      setStripA(strips.A);
      setStripB(strips.B);
      setLayout(layout);
    } catch (err) {
      console.error('Failed to parse snapshot from URL:', err);
    }
  }, [snapshotParam, setBoardSize, setStripA, setStripB, setLayout]);
}
