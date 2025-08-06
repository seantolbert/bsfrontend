"use client";

import { useBoardBuilder } from "@/contexts/BoardBuilderContext";
import Tile from "./Tile";

export default function StripRow({
  label,
  stripKey,
}: {
  label: string;
  stripKey: "stripA" | "stripB";
}) {
  const { stripA, stripB, setStripA, setStripB } = useBoardBuilder();

  const strip = stripKey === "stripA" ? stripA : stripB;
  const setStrip = stripKey === "stripA" ? setStripA : setStripB;

  const handleDrop = (index: number, woodId: string) => {
    const newStrip = [...strip];
    newStrip[index] = woodId;
    setStrip(newStrip);
  };

  const clearStrip = () => {
    setStrip(Array(12).fill(null));
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-[#5e3a1c]">{label}</span>
        <button
          onClick={clearStrip}
          className="text-[10px] text-red-600 py-0.5 hover:bg-red-100"
        >
          Clear
        </button>
      </div>

      <div className="flex gap-0.5">
        {strip.map((woodId, index) => (
          <Tile
            key={index}
            woodId={woodId}
            onDrop={(newId) => handleDrop(index, newId)}
          />
        ))}
      </div>
    </div>
  );
}
