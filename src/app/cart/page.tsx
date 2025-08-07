export default function CartPage() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {/* TODO: Render items added from board builder */}
      <div className="bg-gray-100 rounded p-4">
        <p>Your cart is empty.</p>
      </div>
      {/* TODO: Add checkout button when items exist */}
    </section>
  );
}
