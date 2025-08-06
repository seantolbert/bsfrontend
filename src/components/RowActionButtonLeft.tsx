"use client";

export default function RowActionButtonLeft({
  y,
  onClick,
}: {
  y: number;
  onClick?: () => void;
}) {
  return (
    <foreignObject x={-28} y={y} width={28} height={16}>
      <button
        className="w-full h-full flex items-center justify-center text-xs bg-white border border-gray-400 rounded-l hover:bg-gray-100"
        onClick={onClick || (() => console.log("Left button clicked"))}
      >
        ◀
      </button>
    </foreignObject>
  );
}
