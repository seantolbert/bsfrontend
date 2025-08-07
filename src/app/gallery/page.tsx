export default function GalleryPage() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Board Gallery & Templates</h1>
      <p className="mb-6">
        Browse saved board snapshots. Tap a pattern to start customizing.
      </p>
      {/* TODO: Render snapshot thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {/* Snapshot buttons will go here */}
        <div className="aspect-[3/2] bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-sm text-gray-500">Example Template</span>
        </div>
      </div>
    </section>
  );
}
