"use client";

import { useEffect, useState } from "react";
import { useBoardBuilder } from "@/contexts/BoardBuilderContext";
import RowActionButtonLeft from "./RowActionButtonLeft";
import RowActionButtonRight from "./RowActionButtonRight";

const COLORS = {
  maple: "#f3e2c6",
  ambrosia: "#dec9a0",
  cherry: "#a24f2c",
  canarywood: "#e2b74f",
  padauk: "#a52a2a",
  purpleheart: "#6b2b82",
  walnut: "#5e3a1c",
  ash: "#dcd2b8",
};

const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;
const GAP_HEIGHT = 6;
const SIDE_BUTTON_WIDTH = 28;
const SIDE_MARGIN = SIDE_BUTTON_WIDTH + 4;

export default function BoardPreview() {
  const { stripA, stripB, boardSize } = useBoardBuilder();
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);

  const rowCount = {
    small: 10,
    medium: 14,
    large: 19,
  }[boardSize || "medium"];

  const columnCount = boardSize === "large" ? 15 : 12;

  // Only used once: build visual-only preview matrix
  const [boardRows, setBoardRows] = useState<
    { id: string; color: string | null }[][]
  >([]);

  useEffect(() => {
    const rows = Array.from({ length: rowCount }, (_, rowIndex) => {
      const sourceStrip = rowIndex % 2 === 0 ? stripA : stripB;

      // Create a fully detached row for this index
      return Array.from({ length: columnCount }, (_, colIndex) => ({
        id: `${rowIndex}-${colIndex}-${Math.random()
          .toString(36)
          .substr(2, 5)}`,
        color: sourceStrip[colIndex] || null,
      }));
    });

    setBoardRows(rows);
  }, [stripA, stripB, boardSize]);

  const toggleRowFlip = (rowIndex: number) => {
    setBoardRows((prev) => {
      const updated = [...prev];
      updated[rowIndex] = [...updated[rowIndex]].reverse();
      return updated;
    });
  };

  const totalHeight =
    TILE_HEIGHT * rowCount + (activeRowIndex !== null ? GAP_HEIGHT * 2 : 0);

  const totalWidth = TILE_WIDTH * columnCount + SIDE_MARGIN * 2;

  return (
    <div className="bg-[#fdfcfb] border border-[#e2ded9] rounded-xl h-full flex items-center justify-center overflow-hidden">
      <svg
        width={totalWidth}
        height={totalHeight}
        viewBox={`-${SIDE_MARGIN} 0 ${totalWidth} ${totalHeight}`}
      >
        {boardRows.map((row, rowIndex) => {
          let y = rowIndex * TILE_HEIGHT;
          if (activeRowIndex !== null) {
            if (rowIndex === activeRowIndex) y += GAP_HEIGHT;
            else if (rowIndex > activeRowIndex) y += GAP_HEIGHT * 2;
          }

          const rowLabel = rowIndex % 2 === 0 ? "A" : "B";

          return (
            <>
              {/* Row label */}
              <text
                key={`label-${rowIndex}`}
                x={-SIDE_MARGIN / 2}
                y={y + TILE_HEIGHT / 2 + 4}
                fontSize="10"
                textAnchor="middle"
                fill="#888"
              >
                {rowLabel}
              </text>

              {/* Action buttons */}
              {activeRowIndex === rowIndex && (
                <>
                  <RowActionButtonLeft y={y} />
                  <RowActionButtonRight
                    y={y}
                    xOffset={TILE_WIDTH * columnCount + 4}
                    onClick={() => toggleRowFlip(rowIndex)}
                  />
                </>
              )}

              {/* Row tiles */}
              {row.map((tile, colIndex) => (
                <rect
                  key={tile.id}
                  x={colIndex * TILE_WIDTH}
                  y={y}
                  width={TILE_WIDTH}
                  height={TILE_HEIGHT}
                  fill={COLORS[tile.color] || "#eee"}
                  stroke={activeRowIndex === rowIndex ? "#000" : "#aaa"}
                  strokeWidth={activeRowIndex === rowIndex ? 1.5 : 0.5}
                  rx={2}
                  onClick={() =>
                    setActiveRowIndex(
                      activeRowIndex === rowIndex ? null : rowIndex
                    )
                  }
                  className="cursor-pointer"
                />
              ))}
            </>
          );
        })}
      </svg>
    </div>
  );
}
