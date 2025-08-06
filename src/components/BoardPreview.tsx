"use client";

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

const TILE_WIDTH = 13;
const TILE_HEIGHT = 13;

export default function BoardPreview() {
  const { stripA, stripB, boardSize } = useBoardBuilder();

  // Determine how many rows based on board size
  const rowCount = {
    small: 11,
    medium: 14,
    large: 19,
  }[boardSize || "medium"];

  // Use length of stripA to determine column count
  const columnCount = stripA.length;

  // Alternate stripA and stripB across rowCount
  const previewRows = Array.from({ length: rowCount }, (_, i) =>
    i % 2 === 0 ? stripA : stripB
  );

  return (
    <div className="bg-[#fdfcfb] border border-[#e2ded9] rounded-xl h-full flex items-center justify-center overflow-hidden">
      <svg
        width={TILE_WIDTH * columnCount}
        height={TILE_HEIGHT * rowCount}
        viewBox={`0 0 ${TILE_WIDTH * columnCount} ${TILE_HEIGHT * rowCount}`}
      >
        {previewRows.map((row, rowIndex) =>
          row.map((woodId, colIndex) => (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * TILE_WIDTH}
              y={rowIndex * TILE_HEIGHT}
              width={TILE_WIDTH}
              height={TILE_HEIGHT}
              fill={COLORS[woodId] || "#eee"}
              stroke="#aaa"
              rx={2}
            />
          ))
        )}
      </svg>
    </div>
  );
}
