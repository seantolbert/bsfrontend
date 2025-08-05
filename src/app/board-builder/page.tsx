import { BoardBuilderProvider } from "@/contexts/BoardBuilderContext";
import BoardBuilderLayout from "@/components/BoardBuilderLayout";

export default function BoardBuilderPage() {
  return (
    <BoardBuilderProvider>
      <BoardBuilderLayout />
    </BoardBuilderProvider>
  );
}
