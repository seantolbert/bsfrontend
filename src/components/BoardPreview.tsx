"use client";

/**
 * BoardPreview (top half, locked):
 * - Reads current snapshot + derived grid from snapshot store
 * - Renders the board (you can keep your sideways or vertical rendering;
 *   this is a neutral scaffold that just fills the area)
 * - Keep all interaction logic modular; we’ll add buttons later
 */
import { useSnapshot } from "@/contexts/SnapshotStore";

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

export default function BoardPreview() {
  const { grid, snapshot } = useSnapshot();

  // Tile sizing can be tuned later. For now, auto-fit by using viewBox.
  const cols = grid.length;
  const rows = grid[0]?.length ?? 0;
  const TILE = 14;
  const PAD = 8;
  const width = cols * TILE + PAD * 2;
  const height = rows * TILE + PAD * 2;

  return (
    <div className="h-full w-full flex items-center justify-center">
      <svg
        className="max-h-full max-w-full"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Board preview (${snapshot.size})`}
      >
        {/* background */}
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="#ffffff"
          rx="10"
        />

        {/* tiles */}
        {grid.map((column, x) =>
          column.map((tile, y) => (
            <rect
              key={`${x}-${y}`}
              x={PAD + x * TILE}
              y={PAD + y * TILE}
              width={TILE - 1}
              height={TILE - 1}
              rx={2}
              fill={COLORS[tile.color || ""] || "#eee"}
              stroke="#ddd"
              strokeWidth={0.5}
            />
          ))
        )}
      </svg>
    </div>
  );
}
