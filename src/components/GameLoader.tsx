import React, { useState, useEffect } from "react";
import Game from "../components/WordBomb";

function GameLoader() {
  const [words, setWords] = useState<string[] | null>(null);

  useEffect(() => {
    fetch("/api/words") // Falls Backend-API genutzt wird
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((err) => console.error("Fehler beim Laden:", err));
  }, []);

  if (!words) return <p className="min-h-screen flex flex-col items-center justify-center px-4 text-white text-2xl">Lade Wörter...</p>;

  return <Game words={words} />;
}

export default GameLoader;
