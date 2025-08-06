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

export default function Tile({
  woodId,
  onDrop,
}: {
  woodId: string | null;
  onDrop: (id: string) => void;
}) {
  const { heldWood, setHeldWood } = useBoardBuilder();

  const handlePointerDown = () => {
    if (heldWood) {
      onDrop(heldWood);
      // Do not clear the heldWood
    }
  };

  return (
    <svg
      width={20}
      height={60}
      onPointerDown={handlePointerDown}
      className="cursor-pointer"
    >
      <rect
        width={20}
        height={60}
        fill={woodId ? COLORS[woodId] : "#eee"}
        stroke="#aaa"
        rx={3}
      />
    </svg>
  );
}
