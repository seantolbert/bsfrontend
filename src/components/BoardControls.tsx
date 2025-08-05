"use client";

import PatternSelector from "./controls/PatternSelector";

export default function BoardControls() {
  return (
    <div className="bg-white rounded-xl border border-[#ddd] p-4 h-full overflow-hidden">
      <PatternSelector />
    </div>
  );
}
