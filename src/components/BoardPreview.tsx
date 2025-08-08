"use client";

import { useState } from "react";
import { useSnapshot } from "@/contexts/SnapshotStore";
import RowActionButtonUp from "./RowActionButtonUp";
import RowActionButtonDown from "./RowActionButtonDown";
import FlipSelectedRowButton from "./FlipSelectedRowButton";

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

const TILE_WIDTH = 15;
const TILE_HEIGHT = 14;
const GAP_HEIGHT = 12;
const SIDE_BUTTON_WIDTH = 28;
const SIDE_MARGIN = SIDE_BUTTON_WIDTH + 4;

export default function BoardPreview() {
  const { snapshot, dispatch, boardRows } = useSnapshot();
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [draggingRowIndex, setDraggingRowIndex] = useState<number | null>(null);
  const [dragY, setDragY] = useState<number>(0);

  const rowCount = snapshot.layout.length;
  const columnCount = snapshot.size === "large" ? 15 : 12;

  const moveRow = (from: number, to: number) => {
    dispatch({ type: "MOVE_ROW", payload: { from, to } });
    setActiveRowIndex(to);
  };

  const toggleRowFlip = (rowIndex: number) => {
    dispatch({ type: "TOGGLE_ROW_REVERSED", payload: { rowIndex } });
  };

  const handlePointerDown = (e: React.PointerEvent, rowIndex: number) => {
    setDraggingRowIndex(rowIndex);
    setDragY(e.clientY);
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingRowIndex === null) return;
    const delta = e.clientY - dragY;
    const threshold = TILE_HEIGHT;
    const direction = delta > 0 ? 1 : -1;
    const targetIndex = draggingRowIndex + direction;

    if (
      Math.abs(delta) > threshold &&
      targetIndex >= 0 &&
      targetIndex < rowCount
    ) {
      moveRow(draggingRowIndex, targetIndex);
      setDraggingRowIndex(targetIndex);
      setDragY(e.clientY);
    }
  };
  const handlePointerUp = () => setDraggingRowIndex(null);

  const totalHeight =
    TILE_HEIGHT * rowCount + (activeRowIndex !== null ? GAP_HEIGHT * 2 : 0);
  const totalWidth = TILE_WIDTH * columnCount + SIDE_MARGIN * 2;

  return (
    <div className="bg-[#fdfcfb] border border-[#e2ded9] rounded-xl h-full flex flex-col items-center justify-evenly overflow-hidden">
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

          const rowLabel = snapshot.layout[rowIndex]?.strip || "?";

          return (
            <g
              key={`row-${rowIndex}`}
              onPointerDown={(e) => handlePointerDown(e, rowIndex)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <text
                x={-SIDE_MARGIN / 2}
                y={y + TILE_HEIGHT / 2 + 4}
                fontSize="10"
                textAnchor="middle"
                fill="#888"
              >
                {rowLabel}
              </text>

              {activeRowIndex === rowIndex && (
                <>
                  <RowActionButtonUp
                    y={y}
                    onClick={() => moveRow(rowIndex, rowIndex - 1)}
                  />
                  <RowActionButtonDown
                    y={y}
                    xOffset={TILE_WIDTH * columnCount + 4}
                    onClick={() => moveRow(rowIndex, rowIndex + 1)}
                  />
                </>
              )}

              {row.map((tile, colIndex) => (
                <rect
                  key={tile.id}
                  x={colIndex * TILE_WIDTH}
                  y={y}
                  width={TILE_WIDTH}
                  height={TILE_HEIGHT}
                  fill={
                    draggingRowIndex === rowIndex
                      ? "#ddd"
                      : COLORS[tile.color || ""] || "#eee"
                  }
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
            </g>
          );
        })}
      </svg>

      <div className="h-8 w-full flex justify-center items-center mt-2">
        {activeRowIndex !== null && (
          <FlipSelectedRowButton
            onClick={() => toggleRowFlip(activeRowIndex)}
          />
        )}
      </div>
    </div>
  );
}
