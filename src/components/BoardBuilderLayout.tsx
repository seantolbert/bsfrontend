"use client";

/**
 * Mobile-first, no-scroll scaffold:
 * - Top half: BoardPreview (locked area)
 * - Bottom half: ControlsPanel (locked area)
 * Notes:
 * - We prevent page scrolling (h-screen overflow-hidden).
 * - Each panel is fixed to 50% height. If you later need internal
 *   scrolling INSIDE a panel, you can add overflow-auto to that panel.
 */
import BoardPreview from "./BoardPreview";
import ControlsPanel from "./ControlsPanel";

export default function BoardBuilderLayout() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fdfcfb]">
      {/* TOP 50% — Board Preview */}
      <section
        className="h-1/2 w-full border-b border-[#e2ded9] p-3 pt-[max(env(safe-area-inset-top),0px)]"
        aria-label="Board preview"
      >
        <div className="h-full w-full rounded-xl border border-[#e2ded9] bg-white">
          <BoardPreview />
        </div>
      </section>

      {/* BOTTOM 50% — Controls */}
      <section
        className="h-1/2 w-full p-3 pb-[max(env(safe-area-inset-bottom),0px)]"
        aria-label="Board controls"
      >
        <div className="h-full w-full rounded-xl border border-[#e2ded9] bg-white">
          <ControlsPanel />
        </div>
      </section>
    </div>
  );
}
