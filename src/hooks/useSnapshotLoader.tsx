"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useBoardBuilder } from "@/contexts/BoardBuilderContext";

export function useSnapshotLoader() {
  const params = useSearchParams();
  const snapshotParam = params.get("snapshot");
  const { setBoardSize, setBoardRows } = useBoardBuilder();

  useEffect(() => {
    if (!snapshotParam) return;

    try {
      const decoded = decodeURIComponent(snapshotParam);
      const snapshot = JSON.parse(decoded);

      const { strips, layout, size } = snapshot;

      const boardRows = layout.map(({ strip, reversed }, rowIndex) => {
        const base = strips[strip];
        const row = reversed ? [...base].reverse() : [...base];

        return row.map((color, colIndex) => ({
          id: `${rowIndex}-${colIndex}-${Math.random()
            .toString(36)
            .slice(2, 5)}`,
          color,
        }));
      });

      setBoardSize(size);
      setBoardRows(boardRows);
    } catch (err) {
      console.error("Failed to parse snapshot from URL:", err);
    }
  }, [snapshotParam, setBoardSize, setBoardRows]);
}
