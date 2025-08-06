"use client";

import AvailableWoods from "./controls/AvailableWoods";
import StripsEditor from "./controls/StripsEditor";

export default function BoardControls() {
  return (
    <div className="bg-white p-4 h-full overflow-hidden flex flex-col justify-between">
      {/* Main controls */}
      <div className="space-y-4">
        <StripsEditor />
      </div>

      {/* Static wood options section at the bottom */}
      <AvailableWoods />
    </div>
  );
}
