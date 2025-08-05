import { useBoardBuilder } from "@/contexts/BoardBuilderContext";

const PATTERNS = [
  { id: "classic", name: "Classic", thumbnail: "/patterns/classic.png" },
  { id: "offset", name: "Offset", thumbnail: "/patterns/offset.png" },
  { id: "checker", name: "Checkerboard", thumbnail: "/patterns/checker.png" },
];

export default function PatternSelector() {
  const { pattern, setPattern } = useBoardBuilder();

  return (
    <div className="space-y-2">
      <div>placeholder</div>
    </div>
  );
}
