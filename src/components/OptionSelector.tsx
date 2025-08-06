"use client";

import { useBoardBuilder } from "@/contexts/BoardBuilderContext";

const SIZES = [
  { id: "small", label: "S (9.5×9.5)" },
  { id: "medium", label: "M (10×14)" },
  { id: "large", label: "L (12×18)" },
];

export default function SizeSelector() {
  const { boardSize, setBoardSize } = useBoardBuilder();

  return (
    <div className="bg-white h-full flex flex-col justify-between gap-2">
      {/* Top 3 functional buttons */}
      <button
        onClick={() => console.log("Randomize clicked")}
        className="flex-1 w-full text-sm font-medium   text-[#5e3a1c] bg-white px-2 py-2 hover:bg-[#f5f1ec] transition"
      >
        Randomize
      </button>
      <button
        onClick={() => console.log("Alternate clicked")}
        className="flex-1 w-full text-sm font-medium   text-[#5e3a1c] bg-white px-2 py-2 hover:bg-[#f5f1ec] transition"
      >
        Alternate
      </button>
      <button
        onClick={() => console.log("Save clicked")}
        className="flex-1 w-full text-sm font-medium   text-[#5e3a1c] bg-white px-2 py-2 hover:bg-[#f5f1ec] transition"
      >
        Save
      </button>

      {/* Bottom 3 buttons: board sizes */}
      {SIZES.map((size) => (
        <button
          key={size.id}
          onClick={() => setBoardSize(size.id)}
          className={`
            flex-1 w-full text-sm font-medium  px-2 py-2
            transition-all
            ${
              boardSize === size.id
                ? "bg-[#5e3a1c] text-white "
                : "bg-white text-[#5e3a1c]"
            }
          `}
        >
          {size.label}
        </button>
      ))}
    </div>
  );
}
