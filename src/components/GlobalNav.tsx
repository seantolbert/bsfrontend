// Simple global navigation bar for logo, home, cart, etc.
export default function GlobalNav() {
  return (
    <div className="flex justify-between items-center w-full text-base font-medium">
      <span>Berner Studio</span>
      <div className="flex gap-4">
        <button className="text-sm text-[#5e3a1c]">Gallery</button>
        <button className="text-sm text-[#5e3a1c]">Cart</button>
      </div>
    </div>
  );
}
