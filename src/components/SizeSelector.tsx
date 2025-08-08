"use client";

import { useSnapshot } from "@/contexts/SnapshotStore";
import { useSnapshotActions } from "@/hooks/useSnapshotActions";

export default function SizeSelector() {
  const { snapshot } = useSnapshot();
  const { setSize } = useSnapshotActions();

  return (
    <div className="bg-white border rounded p-2 flex gap-2">
      {(["small", "medium", "large"] as const).map((s) => (
        <button
          key={s}
          className={`flex-1 py-2 rounded border ${
            snapshot.size === s
              ? "bg-black text-white"
              : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => setSize(s)}
        >
          {s[0].toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  );
}
