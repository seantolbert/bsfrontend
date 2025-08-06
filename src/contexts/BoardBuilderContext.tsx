"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Define the context shape
const BoardBuilderContext = createContext(null);

export function BoardBuilderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pattern, setPattern] = useState<string | null>(null);
  const [heldWood, setHeldWood] = useState<string | null>(null);
  const [boardSize, setBoardSize] = useState<"small" | "medium" | "large">(
    "medium"
  );
  const [woodSpecies, setWoodSpecies] = useState<string[]>([]);
  const [edgeProfile, setEdgeProfile] = useState<string | null>(null);
  const [juiceGroove, setJuiceGroove] = useState<boolean>(false);
  const [brassFeet, setBrassFeet] = useState<boolean>(false);

  // --- Strip management ---
  const getStripLength = (size: "small" | "medium" | "large" | null) => {
    switch (size) {
      case "large":
        return 15;
      default:
        return 12;
    }
  };

  // Initialize strips at medium size (12)
  const [stripA, setStripA] = useState<string[]>(
    Array(getStripLength("medium")).fill(null)
  );
  const [stripB, setStripB] = useState<string[]>(
    Array(getStripLength("medium")).fill(null)
  );

  // Resize strips dynamically when boardSize changes
  useEffect(() => {
    const newLength = getStripLength(boardSize);

    setStripA((prev) => {
      const resized = [...prev.slice(0, newLength)];
      while (resized.length < newLength) resized.push(null);
      return resized;
    });

    setStripB((prev) => {
      const resized = [...prev.slice(0, newLength)];
      while (resized.length < newLength) resized.push(null);
      return resized;
    });
  }, [boardSize]);

  return (
    <BoardBuilderContext.Provider
      value={{
        pattern,
        setPattern,
        heldWood,
        setHeldWood,
        boardSize,
        setBoardSize,
        woodSpecies,
        setWoodSpecies,
        edgeProfile,
        setEdgeProfile,
        juiceGroove,
        setJuiceGroove,
        brassFeet,
        setBrassFeet,
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

// Hook to use the board builder context
export function useBoardBuilder() {
  const context = useContext(BoardBuilderContext);
  if (!context) {
    throw new Error(
      "useBoardBuilder must be used within a BoardBuilderProvider"
    );
  }
  return context;
}
