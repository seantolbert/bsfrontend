"use client";

import { useState } from "react";
import { useSnapshot } from "@/contexts/SnapshotStore";
import { useSnapshotActions } from "@/hooks/useSnapshotActions";

const COLORS: Record<string, string> = {
  maple: "#f3e2c6",
  ambrosia: "#dec9a0",
  cherry: "#a24f2c",
  canarywood: "#e2b74f",
  padauk: "#a52a2a",
  purpleheart: "#6b2b82",
  walnut: "#5e3a1c",
  ash: "#dcd2b8",
};

const TILE_W = 14; // width of a single tile
const TILE_H = 14; // height of a single tile
const GAP = 10; // gap to isolate selected column
const SIDE_BTN_W = 28;
const MARGIN = SIDE_BTN_W + 4;

export default function BoardPreview() {
  const { snapshot, grid } = useSnapshot(); // grid[col][row]
  const { moveColumn, toggleColumnReversed, setColumnStrip } =
    useSnapshotActions();
  const [activeCol, setActiveCol] = useState<number | null>(null);

  const cols = grid.length;
  const rows = grid[0]?.length ?? 0;

  const totalW = TILE_W * cols + MARGIN * 2;
  const totalH = TILE_H * rows + 24; // label space

  return (
    <div className="bg-[#fdfcfb] border border-[#e2ded9] rounded-xl w-full overflow-hidden">
      <svg width="100%" viewBox={`0 0 ${totalW} ${totalH}`}>
        {/* col labels (A/B/C) */}
        {snapshot.layout.map((colMeta, col) => {
          const x =
            MARGIN +
            col * TILE_W +
            (activeCol !== null && col > activeCol ? GAP : 0);
          return (
            <text
              key={`lbl-${col}`}
              x={x + TILE_W / 2}
              y={12}
              fontSize="10"
              textAnchor="middle"
              fill="#888"
            >
              {colMeta.strip}
            </text>
          );
        })}

        {/* columns */}
        {grid.map((column, col) => {
          let x = MARGIN + col * TILE_W;
          if (activeCol !== null) x += col > activeCol ? GAP : 0;
          return (
            <g key={`col-${col}`}>
              {/* action buttons when selected */}
              {activeCol === col && (
                <>
                  {/* move left */}
                  <foreignObject
                    x={x - 30}
                    y={totalH / 2 - 8}
                    width="26"
                    height="16"
                  >
                    <button
                      className="w-full h-full text-xs bg-white border border-gray-400 rounded hover:bg-gray-100"
                      onClick={() => moveColumn(col, col - 1)}
                    >
                      ⬅
                    </button>
                  </foreignObject>
                  {/* move right */}
                  <foreignObject
                    x={x + TILE_W + 4}
                    y={totalH / 2 - 8}
                    width="26"
                    height="16"
                  >
                    <button
                      className="w-full h-full text-xs bg-white border border-gray-400 rounded hover:bg-gray-100"
                      onClick={() => moveColumn(col, col + 1)}
                    >
                      ➡
                    </button>
                  </foreignObject>
                  {/* flip */}
                  <foreignObject
                    x={x - 30}
                    y={totalH - 22}
                    width="90"
                    height="18"
                  >
                    <button
                      className="w-full h-full text-xs bg-white border border-gray-400 rounded hover:bg-gray-100"
                      onClick={() => toggleColumnReversed(col)}
                    >
                      🔁 Flip Column
                    </button>
                  </foreignObject>

                  {/* change strip (A/B/C) */}
                  <foreignObject
                    x={x + TILE_W + 4}
                    y={totalH - 22}
                    width="110"
                    height="18"
                  >
                    <div className="w-full h-full flex gap-1">
                      {(["A", "B", "C"] as const).map((s) => (
                        <button
                          key={s}
                          className={`flex-1 text-xs border rounded ${
                            snapshot.layout[col].strip === s
                              ? "bg-black text-white"
                              : "bg-white border-gray-400 hover:bg-gray-100"
                          }`}
                          onClick={() => setColumnStrip(col, s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </foreignObject>
                </>
              )}

              {/* tiles (top to bottom) */}
              {column.map((tile, row) => {
                const y = 18 + row * TILE_H;
                return (
                  <rect
                    key={tile.id}
                    x={x}
                    y={y}
                    width={TILE_W}
                    height={TILE_H}
                    fill={COLORS[tile.color || ""] || "#eee"}
                    stroke={activeCol === col ? "#000" : "#aaa"}
                    strokeWidth={activeCol === col ? 1.5 : 0.5}
                    rx={2}
                    onClick={() => setActiveCol(activeCol === col ? null : col)}
                  />
                );
              })}
            </g>
          );
        })}

        {/* gap to isolate active column */}
        {activeCol !== null && (
          <rect
            x={MARGIN + (activeCol + 1) * TILE_W}
            y={0}
            width={GAP}
            height={totalH}
            fill="transparent"
          />
        )}
      </svg>
    </div>
  );
}
