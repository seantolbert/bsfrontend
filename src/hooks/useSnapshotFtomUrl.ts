'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSnapshot } from '@/contexts/SnapshotStore';

export function useSnapshotFromUrl() {
  const params = useSearchParams();
  const encoded = params.get('snapshot');
  const { dispatch } = useSnapshot();

  useEffect(() => {
    if (!encoded) return;
    try {
      const decoded = decodeURIComponent(encoded);
      const snap = JSON.parse(decoded);
      // You could validate shape here if you want
      dispatch({ type: 'LOAD_SNAPSHOT', payload: snap });
    } catch (e) {
      console.error('Failed to parse snapshot from URL:', e);
    }
  }, [encoded, dispatch]);
}
