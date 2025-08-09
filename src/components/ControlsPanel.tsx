"use client";

/**
 * ControlsPanel (bottom half, locked):
 * - Minimal, modular scaffold to house all controls.
 * - Left: Size selector (Small/Med/Large)
 * - Middle: Strip selectors (A/B/C) — each opens its own editor
 * - Right: Action row placeholder (Randomize / Alternate / Save)
 * You can swap, re-order, or expand these sections without touching layout.
 */
import SizeSelector from "./SizeSelector";
import StripEditor from "./StripEditor";

export default function ControlsPanel() {
  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr_auto] gap-2 p-3">
      {/* Row 1: Size */}
      <div>
        <SizeSelector />
      </div>

      {/* Row 2: Strip Editors (A/B/C) */}
      <div className="grid grid-cols-3 gap-2">
        <StripEditor strip="A" />
        <StripEditor strip="B" />
        <StripEditor strip="C" />
      </div>

      {/* Row 3: Quick actions (placeholders; wire up later) */}
      <div className="flex gap-2">
        <button className="flex-1 py-2 rounded border hover:bg-gray-50">
          Randomize
        </button>
        <button className="flex-1 py-2 rounded border hover:bg-gray-50">
          Alternate
        </button>
        <button className="flex-1 py-2 rounded border hover:bg-gray-50">
          Save
        </button>
      </div>
    </div>
  );
}
