"use client";

import { createContext, useContext, useState } from "react";

const BoardBuilderContext = createContext(null);

export function BoardBuilderProvider({ children }) {
  const [pattern, setPattern] = useState<string | null>(null);
  const [woodSpecies, setWoodSpecies] = useState<string[]>([]);
  const [boardSize, setBoardSize] = useState<string | null>(null);
  const [edgeProfile, setEdgeProfile] = useState<string | null>(null);
  const [juiceGroove, setJuiceGroove] = useState<boolean>(false);
  const [heldWood, setHeldWood] = useState<string | null>(null);
  const emptyStrip = Array(12).fill(null);
  const [stripA, setStripA] = useState([...emptyStrip]);
  const [stripB, setStripB] = useState([...emptyStrip]);

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
        heldWood,
        setHeldWood,
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
  if (!context)
    throw new Error("useBoardBuilder must be used within BoardBuilderProvider");
  return context;
}
