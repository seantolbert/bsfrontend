"use client";

/**
 * Board Builder page wrapper:
 * - Provides the snapshot store (single source of truth)
 * - Loads a snapshot from ?snapshot=... if present
 * - Renders the 50/50 layout (preview on top, controls on bottom)
 */
import { SnapshotProvider } from "@/contexts/SnapshotStore";
import { useSnapshotFromUrl } from "@/hooks/useSnapshotFromUrl";
import BoardBuilderLayout from "@/components/BoardBuilderLayout";

function PageInner() {
  // Load a template snapshot from URL once (safe no-op if absent)
  useSnapshotFromUrl();
  return <BoardBuilderLayout />;
}

export default function BoardBuilderPage() {
  return (
    <SnapshotProvider>
      <PageInner />
    </SnapshotProvider>
  );
}
