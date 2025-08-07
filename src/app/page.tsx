export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Custom End Grain Cutting Boards
      </h1>
      <p className="text-lg max-w-xl mb-8">
        Design your dream cutting board with premium exotic hardwoods. Choose
        from saved templates or start from scratch.
      </p>
      <a
        href="/board-builder"
        className="px-6 py-3 bg-black text-white rounded hover:bg-gray-900"
      >
        Build a Board
      </a>
    </section>
  );
}
