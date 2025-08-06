"use client";

export default function FlipSelectedRowButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div className="mt-2 flex justify-center w-full">
      <button
        className="px-4 py-1 text-sm rounded bg-white border border-gray-400 hover:bg-gray-100 shadow-sm"
        onClick={onClick}
      >
        🔁 Flip Selected Row
      </button>
    </div>
  );
}
