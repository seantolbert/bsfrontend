"use client";

import Link from "next/link";

type BoardSnapshot = {
  size: "small" | "medium" | "large";
  strips: {
    A: (string | null)[];
    B: (string | null)[];
  };
  layout: {
    strip: "A" | "B";
    reversed: boolean;
  }[];
};

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

function inflateBoardRows(snapshot: BoardSnapshot) {
  const { strips, layout } = snapshot;
  return layout.map(({ strip, reversed }, rowIndex) => {
    const base = strips[strip];
    const final = reversed ? [...base].reverse() : [...base];
    return final.map((color, colIndex) => ({
      id: `${rowIndex}-${colIndex}`,
      color,
    }));
  });
}

export default function SnapshotCard({
  snapshot,
  label,
}: {
  snapshot: BoardSnapshot;
  label?: string;
}) {
  const boardRows = inflateBoardRows(snapshot);
  const rowCount = boardRows.length;
  const colCount = boardRows[0]?.length || 12;

  const TILE_SIZE = 6;
  const WIDTH = TILE_SIZE * colCount;
  const HEIGHT = TILE_SIZE * rowCount;

  const encodedSnapshot = encodeURIComponent(JSON.stringify(snapshot));

  return (
    <Link
      href={`/board-builder?snapshot=${encodedSnapshot}`}
      className="bg-white rounded-md shadow-sm border p-2 flex flex-col items-center gap-2 hover:bg-gray-100 transition"
    >
      <svg width={WIDTH} height={HEIGHT}>
        {boardRows.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <rect
              key={tile.id}
              x={colIndex * TILE_SIZE}
              y={rowIndex * TILE_SIZE}
              width={TILE_SIZE}
              height={TILE_SIZE}
              fill={COLORS[tile.color as keyof typeof COLORS] || "#eee"}
              stroke="#ccc"
              strokeWidth={0.25}
              rx={1}
            />
          ))
        )}
      </svg>
      {label && (
        <div className="text-xs text-gray-600 text-center">{label}</div>
      )}
    </Link>
  );
}
