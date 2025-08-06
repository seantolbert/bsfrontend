import TopNav from "./TopNav";
import BoardPreview from "./BoardPreview";
import BoardControls from "./BoardControls";
import BottomNav from "./BottomNav";
import SizeSelector from "./controls/SizeSelector";

export default function BoardBuilderLayout() {
  return (
    <div className="h-[calc(100vh-56px)] w-full flex flex-col">
      <div className="h-14 flex items-center justify-center border-b border-[#ddd] px-4">
        <TopNav />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex">
          <div className="flex-2 overflow-hidden pl-4">
            <BoardPreview />
          </div>
          <div className="flex-1 overflow-hidden pr-4">
            <SizeSelector />
          </div>
        </div>
        <div className="h-[300px] px-4 pb-2">
          <BoardControls />
        </div>
      </div>
      <div className="h-16 border-t border-[#ddd] px-4">
        <BottomNav />
      </div>
    </div>
  );
}
