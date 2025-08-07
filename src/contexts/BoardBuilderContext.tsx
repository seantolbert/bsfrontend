"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type BoardSize = "small" | "medium" | "large";

type Tile = {
  id: string;
  color: string | null;
};

type Row = Tile[];

interface BoardBuilderContextType {
  boardSize: BoardSize;
  setBoardSize: (size: BoardSize) => void;

  boardRows: Row[];
  setBoardRows: (rows: Row[]) => void;

  stripA: (string | null)[];
  setStripA: (woods: (string | null)[]) => void;

  stripB: (string | null)[];
  setStripB: (woods: (string | null)[]) => void;
}

const BoardBuilderContext = createContext<BoardBuilderContextType | undefined>(
  undefined
);

export function BoardBuilderProvider({ children }: { children: ReactNode }) {
  const [boardSize, setBoardSize] = useState<BoardSize>("medium");

  const [boardRows, setBoardRows] = useState<Row[]>([]);

  const [stripA, setStripA] = useState<(string | null)[]>(Array(12).fill(null));
  const [stripB, setStripB] = useState<(string | null)[]>(Array(12).fill(null));

  return (
    <BoardBuilderContext.Provider
      value={{
        boardSize,
        setBoardSize,
        boardRows,
        setBoardRows,
        stripA,
        setStripA,
        stripB,
        setStripB,
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
