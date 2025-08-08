"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type BoardSize = "small" | "medium" | "large";
type StripLayout = { strip: "A" | "B"; reversed: boolean };

interface BoardBuilderContextType {
  boardSize: BoardSize;
  setBoardSize: (size: BoardSize) => void;

  stripA: (string | null)[];
  setStripA: (woods: (string | null)[]) => void;

  stripB: (string | null)[];
  setStripB: (woods: (string | null)[]) => void;

  layout: StripLayout[];
  setLayout: (layout: StripLayout[]) => void;
}

const BoardBuilderContext = createContext<BoardBuilderContextType | undefined>(
  undefined
);

export function BoardBuilderProvider({ children }: { children: ReactNode }) {
  const [boardSize, setBoardSize] = useState<BoardSize>("medium");
  const [stripA, setStripA] = useState<(string | null)[]>(Array(12).fill(null));
  const [stripB, setStripB] = useState<(string | null)[]>(Array(12).fill(null));
  const [layout, setLayout] = useState<StripLayout[]>([]);

  return (
    <BoardBuilderContext.Provider
      value={{
        boardSize,
        setBoardSize,
        stripA,
        setStripA,
        stripB,
        setStripB,
        layout,
        setLayout,
      }}
    >
      {children}
    </BoardBuilderContext.Provider>
  );
}

export function useBoardBuilder() {
  const context = useContext(BoardBuilderContext);
  if (!context) {
    throw new Error(
      "useBoardBuilder must be used within a BoardBuilderProvider"
    );
  }
  return context;
}
