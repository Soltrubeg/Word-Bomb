import React, { useState, useEffect } from "react";
import Game from "../components/WordBomb";

function GameLoader() {
  const [words, setWords] = useState<string[] | null>(null);

  useEffect(() => {
    fetch("/Word-Bomb/words.txt")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.text();
      })
      .then((data) => {
        console.log("Fetched words:", data); // Debugging
        setWords(data.split("\n").map(word => word.trim()));
      })
      .catch((err) => console.error("Fehler beim Laden der Wörter:", err));
  }, []);
  

  if (!words) return <p className="min-h-screen flex flex-col items-center justify-center px-4 text-white text-2xl">Lade Wörter...</p>;

  return <Game words={words} />;
}

export default GameLoader;
