"use client";

import BoardPreview from "./BoardPreview";
import StripEditor from "./StripEditor";
import SizeSelector from "./SizeSelector";

export default function BoardBuilderLayout() {
  // Mobile-first: preview on top, controls stacked; later we can reflow for desktop
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      {/* Top: Board Preview (sideways) */}
      <div className="flex-none p-3">
        <BoardPreview />
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col gap-3 p-3 pt-0">
        <SizeSelector />
        {/* Three strip editors (A,B,C) */}
        <div className="grid grid-cols-3 gap-2">
          <StripEditor strip="A" />
          <StripEditor strip="B" />
          <StripEditor strip="C" />
        </div>
      </div>
    </div>
  );
}
