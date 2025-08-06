"use client";

import { useState } from "react";
import { useBoardBuilder } from "@/contexts/BoardBuilderContext";

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
const SIDE_BUTTON_WIDTH = 28; // updated size
const SIDE_MARGIN = SIDE_BUTTON_WIDTH + 4;

export default function BoardPreview() {
  const { stripA, stripB, boardSize } = useBoardBuilder();
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);

  const rowCount = {
    small: 10,
    medium: 14,
    large: 19,
  }[boardSize || "medium"];

  const columnCount = stripA.length;
  const previewRows = Array.from({ length: rowCount }, (_, i) =>
    i % 2 === 0 ? stripA : stripB
  );

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
        {previewRows.map((row, rowIndex) => {
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

              {/* Row buttons */}
              {activeRowIndex === rowIndex && (
                <>
                  {/* Left button */}
                  <foreignObject
                    x={-SIDE_MARGIN}
                    y={y}
                    width={SIDE_BUTTON_WIDTH}
                    height={TILE_HEIGHT}
                  >
                    <button
                      className="w-full h-full flex items-center justify-center text-xs bg-white border border-gray-400 rounded-l hover:bg-gray-100"
                      onClick={() => console.log("Left button clicked")}
                    >
                      ◀
                    </button>
                  </foreignObject>

                  {/* Right button */}
                  <foreignObject
                    x={TILE_WIDTH * columnCount + 4}
                    y={y}
                    width={SIDE_BUTTON_WIDTH}
                    height={TILE_HEIGHT}
                  >
                    <button
                      className="w-full h-full flex items-center justify-center text-xs bg-white border border-gray-400 rounded-r hover:bg-gray-100"
                      onClick={() => console.log("Right button clicked")}
                    >
                      ▶
                    </button>
                  </foreignObject>
                </>
              )}

              {/* Row tiles */}
              {row.map((woodId, colIndex) => (
                <rect
                  key={`${rowIndex}-${colIndex}`}
                  x={colIndex * TILE_WIDTH}
                  y={y}
                  width={TILE_WIDTH}
                  height={TILE_HEIGHT}
                  fill={COLORS[woodId] || "#eee"}
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
