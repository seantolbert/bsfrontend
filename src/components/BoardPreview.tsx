"use client";

import { useEffect, useState } from "react";
import { useBoardBuilder } from "@/contexts/BoardBuilderContext";
import RowActionButtonDown from "./RowActionButtonDown";
import RowActionButtonUp from "./RowActionButtonUp";
import FlipSelectedRowButton from "./FlipSelectedRowButton";

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

const TILE_WIDTH = 14;
const TILE_HEIGHT = 14;
const GAP_HEIGHT = 12;
const SIDE_BUTTON_WIDTH = 28;
const SIDE_MARGIN = SIDE_BUTTON_WIDTH + 4;

export default function BoardPreview() {
  const { stripA, stripB, boardSize } = useBoardBuilder();
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [boardRows, setBoardRows] = useState<
    { id: string; color: string | null }[][]
  >([]);
  const [draggingRowIndex, setDraggingRowIndex] = useState<number | null>(null);
  const [dragY, setDragY] = useState<number>(0);

  const rowCount = {
    small: 10,
    medium: 14,
    large: 19,
  }[boardSize || "medium"];

  const columnCount = boardSize === "large" ? 15 : 12;

  useEffect(() => {
    const rows = Array.from({ length: rowCount }, (_, rowIndex) => {
      const sourceStrip = rowIndex % 2 === 0 ? stripA : stripB;
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

  const moveRowUp = (rowIndex: number) => {
    if (rowIndex <= 0) return;
    setBoardRows((prev) => {
      const updated = [...prev];
      const temp = updated[rowIndex - 1];
      updated[rowIndex - 1] = updated[rowIndex];
      updated[rowIndex] = temp;
      return updated;
    });
    setActiveRowIndex((prev) => (prev === null ? null : prev - 1));
  };

  const moveRowDown = (rowIndex: number) => {
    if (rowIndex >= boardRows.length - 1) return;
    setBoardRows((prev) => {
      const updated = [...prev];
      const temp = updated[rowIndex + 1];
      updated[rowIndex + 1] = updated[rowIndex];
      updated[rowIndex] = temp;
      return updated;
    });
    setActiveRowIndex((prev) => (prev === null ? null : prev + 1));
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
    if (Math.abs(delta) > threshold) {
      const direction = delta > 0 ? 1 : -1;
      const targetIndex = draggingRowIndex + direction;
      if (targetIndex >= 0 && targetIndex < boardRows.length) {
        setBoardRows((prev) => {
          const updated = [...prev];
          const temp = updated[draggingRowIndex];
          updated[draggingRowIndex] = updated[targetIndex];
          updated[targetIndex] = temp;
          return updated;
        });
        setDraggingRowIndex(targetIndex);
        setDragY(e.clientY);
      }
    }
  };

  const handlePointerUp = () => {
    setDraggingRowIndex(null);
  };

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

          const rowLabel = rowIndex % 2 === 0 ? "A" : "B";

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
                    onClick={() => moveRowUp(rowIndex)}
                  />
                  <RowActionButtonDown
                    y={y}
                    xOffset={TILE_WIDTH * columnCount + 4}
                    onClick={() => moveRowDown(rowIndex)}
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
                      : COLORS[tile.color] || "#eee"
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
