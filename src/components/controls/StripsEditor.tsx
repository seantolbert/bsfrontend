"use client";

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

const WOODS = Object.keys(COLORS);

export default function StripEditor({ strip }: { strip: "A" | "B" | "C" }) {
  const { snapshot } = useSnapshot();
  const { setStripCell, setStrip } = useSnapshotActions();
  const arr = snapshot.strips[strip];
  const cols = arr.length;

  return (
    <div className="bg-white border rounded p-2 flex flex-col gap-2">
      <div className="text-sm font-medium">Strip {strip}</div>

      {/* quick woods palette */}
      <div className="flex flex-wrap gap-1">
        {WOODS.map((w) => (
          <button
            key={w}
            className="w-6 h-6 border rounded"
            style={{ background: COLORS[w] }}
            onClick={() => {
              // Example bulk: fill entire strip with this wood
              setStrip(strip, Array(cols).fill(w));
            }}
            aria-label={`Fill ${strip} with ${w}`}
          />
        ))}
        <button
          className="px-2 py-1 text-xs border rounded"
          onClick={() => setStrip(strip, Array(cols).fill(null))}
        >
          Clear
        </button>
      </div>

      {/* cells row */}
      <div className="flex gap-1 overflow-x-auto">
        {arr.map((wood, i) => (
          <button
            key={i}
            className="w-6 h-6 border rounded"
            title={`${wood ?? "empty"}`}
            style={{ background: COLORS[wood || ""] || "#eee" }}
            onClick={() => {
              // cycle through woods quickly on tap (demo)
              const cur = WOODS.indexOf(wood || "");
              const next = WOODS[(cur + 1) % WOODS.length] || WOODS[0];
              setStripCell(strip, i, next);
            }}
          />
        ))}
      </div>
    </div>
  );
}
