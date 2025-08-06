"use client";

import { useBoardBuilder } from "@/contexts/BoardBuilderContext";
import { useDrop } from "react-dnd";
import StripRow from "./StripRow";

export default function StripsEditor() {
  return (
    <div className="space-y-3">
      <StripRow label="Strip A" stripKey="stripA" />
      <StripRow label="Strip B" stripKey="stripB" />
    </div>
  );
}
