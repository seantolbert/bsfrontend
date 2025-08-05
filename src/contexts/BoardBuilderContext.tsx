"use client";

import { createContext, useContext, useState } from "react";

const BoardBuilderContext = createContext(null);

export function BoardBuilderProvider({ children }) {
  const [pattern, setPattern] = useState<string | null>(null);
  const [woodSpecies, setWoodSpecies] = useState<string[]>([]);
  const [boardSize, setBoardSize] = useState<string | null>(null);
  const [edgeProfile, setEdgeProfile] = useState<string | null>(null);
  const [juiceGroove, setJuiceGroove] = useState<boolean>(false);
  const [brassFeet, setBrassFeet] = useState<boolean>(false);

  return (
    <BoardBuilderContext.Provider
      value={{
        pattern,
        setPattern,
        woodSpecies,
        setWoodSpecies,
        boardSize,
        setBoardSize,
        edgeProfile,
        setEdgeProfile,
        juiceGroove,
        setJuiceGroove,
        brassFeet,
        setBrassFeet,
      }}
    >
      {children}
    </BoardBuilderContext.Provider>
  );
}

export function useBoardBuilder() {
  const context = useContext(BoardBuilderContext);
  if (!context)
    throw new Error("useBoardBuilder must be used within BoardBuilderProvider");
  return context;
}
