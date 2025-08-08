"use client";

import Link from "next/link";
import SnapshotCard from "@/components/SnapshotCard";

const demoTemplates = [
  {
    label: "Start from Scratch",
    snapshot: null,
  },
  {
    label: "Classic Maple + Walnut",
    snapshot: {
      size: "medium",
      strips: {
        A: [
          "maple",
          "walnut",
          "maple",
          "walnut",
          "maple",
          "walnut",
          "maple",
          "walnut",
          "maple",
          "walnut",
          "maple",
          "walnut",
        ],
        B: [
          "walnut",
          "maple",
          "walnut",
          "maple",
          "walnut",
          "maple",
          "walnut",
          "maple",
          "walnut",
          "maple",
          "walnut",
          "maple",
        ],
      },
      layout: [
        { strip: "A", reversed: false },
        { strip: "B", reversed: true },
        { strip: "A", reversed: false },
        { strip: "B", reversed: false },
        { strip: "A", reversed: false },
        { strip: "B", reversed: true },
        { strip: "A", reversed: false },
        { strip: "B", reversed: false },
        { strip: "B", reversed: false },
        { strip: "B", reversed: false },
      ],
    },
  },
  {
    label: "Reversible Checker",
    snapshot: {
      size: "medium",
      strips: {
        A: [
          "cherry",
          "maple",
          "cherry",
          "maple",
          "cherry",
          "maple",
          "cherry",
          "maple",
          "cherry",
          "maple",
          "cherry",
          "maple",
        ],
        B: [
          "maple",
          "cherry",
          "maple",
          "cherry",
          "maple",
          "cherry",
          "maple",
          "cherry",
          "maple",
          "cherry",
          "maple",
          "cherry",
        ],
      },
      layout: Array.from({ length: 12 }, (_, i) => ({
        strip: i % 2 === 0 ? "A" : "B",
        reversed: i % 3 === 0,
      })),
    },
  },
];

export default function TemplatesPage() {
  return (
    <section className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Choose a Template</h1>

      <div className="grid grid-cols-2 gap-4">
        {demoTemplates.map((template, index) => {
          if (!template.snapshot) {
            return (
              <Link
                key={`template-${index}`}
                href="/board-builder"
                className="bg-gray-100 rounded p-4 flex items-center justify-center text-center text-sm font-medium hover:bg-gray-200"
              >
                🛠️ Start from Scratch
              </Link>
            );
          }

          return (
            <SnapshotCard
              key={`template-${index}`}
              snapshot={template.snapshot}
              onContinue={() => {
                window.location.href =
                  "/board-builder?snapshot=" +
                  encodeURIComponent(JSON.stringify(template.snapshot));
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
