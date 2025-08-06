"use client";

export default function RowActionButtonDown({
  y,
  xOffset,
  onClick,
}: {
  y: number;
  xOffset: number;
  onClick: () => void;
}) {
  return (
    <foreignObject x={xOffset} y={y} width={28} height={16}>
      <button
        className="w-full h-full flex items-center justify-center text-xs bg-white border border-gray-400 rounded-r hover:bg-gray-100"
        onClick={onClick}
      >
        ⬇
      </button>
    </foreignObject>
  );
}
