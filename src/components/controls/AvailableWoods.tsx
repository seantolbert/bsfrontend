"use client";

import { useBoardBuilder } from "@/contexts/BoardBuilderContext";

const WOODS = [
  { id: "maple", name: "Maple", color: "#f3e2c6" },
  { id: "ambrosia", name: "Ambrosia Maple", color: "#dec9a0" },
  { id: "cherry", name: "Cherry", color: "#a24f2c" },
  { id: "canarywood", name: "Canarywood", color: "#e2b74f" },
  { id: "padauk", name: "Padauk", color: "#a52a2a" },
  { id: "purpleheart", name: "Purpleheart", color: "#6b2b82" },
  { id: "walnut", name: "Walnut", color: "#5e3a1c" },
  { id: "ash", name: "Ash", color: "#dcd2b8" },
];

export default function AvailableWoods() {
  const { heldWood, setHeldWood } = useBoardBuilder();
  const selectedWood = WOODS.find((wood) => wood.id === heldWood);

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold mb-2 text-[#5e3a1c]">
        Available Woods
      </h4>

      <div className="flex gap-2 overflow-x-auto">
        {WOODS.map((wood) => (
          <div
            key={wood.id}
            className="flex flex-col justify-end items-center w-[32px] h-[48px] shrink-0"
          >
            <DraggableWoodTile
              wood={wood}
              isSelected={heldWood === wood.id}
              onSelect={() => {
                setHeldWood(heldWood === wood.id ? null : wood.id);
              }}
            />
          </div>
        ))}
      </div>

      {selectedWood && (
        <div className="text-center mt-1 text-[11px] text-[#5e3a1c] font-medium">
          {selectedWood.name}
        </div>
      )}
    </div>
  );
}

function DraggableWoodTile({
  wood,
  isSelected,
  onSelect,
}: {
  wood: { id: string; name: string; color: string };
  isSelected: boolean;
  onSelect: () => void;
}) {
  const height = isSelected ? 47 : 32;

  return (
    <button
      onClick={onSelect}
      className={`
        transition-all duration-150 ease-out
        opacity-${isSelected ? "60" : "100"}
      `}
    >
      <svg width={32} height={height}>
        <rect
          width={32}
          height={height}
          fill={wood.color}
          stroke="#333"
          strokeWidth={0.5}
          rx={3}
        />
      </svg>
    </button>
  );
}
