import React, { useState, useEffect } from "react";
import Game from "../components/WordBomb";

function GameLoader() {
  const [words, setWords] = useState<string[] | null>(null);

  useEffect(() => {
    fetch("https://soltrubeg.github.io/Word-Bomb/words.txt")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.text();
      })
      .then((data) => {
        setWords(data.split("\n").map(word => word.trim()));
      })
      .catch((err) => console.error("Fehler beim Laden der Wörter:", err));
  }, []);
  

  if (!words) return (<div class="h-screen flex justify-center items-center">
  <p class="text-white text-3xl mr-5">Lädt Wörter</p>
  <div class="h-15 w-15 border-8 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div></div>);

  return <Game words={words} />;
}

export default GameLoader;
