"use client";

import { SnapshotProvider } from "@/contexts/SnapshotStore";
import { useSnapshotFromUrl } from "@/hooks/useSnapshotFromUrl";
import BoardBuilderLayout from "@/components/BoardBuilderLayout";

function PageInner() {
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
