import React, { useState, useEffect, useRef } from 'react';


function WordBomb ({ words }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(2);
  const [gameOver, setGameOver] = useState(false);
  const [progress, setProgress] = useState(100);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [usedWords, setUsedWords] = useState([]);
  var reqLetters = "abcdefghijklmnopqrstuvwxz".split("")
  const [usedLetters, setUsedLetters] = useState(reqLetters.reduce((obj, key) => {
    obj[key] = 0;
    return obj;
  }, {}));

  const generateLetters = () => {
    var letters = [
      "EN", "AN", "AR", "TT", "LA", "RE", "IN", "HT", "SE", "ER",
      "CH", "ST", "DE", "ND", "TE", "IT", "ES", "EL", "LE", "AL",
      "ME", "GE", "NE", "BE", "UN", "DA", "LI", "MA", "RA", "DI",
      "ON", "VE", "SO", "LO", "MI", "PA", "TA", "NO", "FI", "HA",
      "PE", "TR", "MO", "GI", "CA", "PR", "IS", "OT", "NA", "DO",
      "LU", "CU", "RI", "GA", "TU", "BO", "SC", "GR", "WI", "KR",
      "QU", "ZE", "FU", "BA", "KE", "BL", "PO", "VO", "SN", "FL",
      "PH", "JO", "HU", "FA", "FR", "PL", "SH", "CL", "DW", "SW",
      "TW", "WH", "BR", "CR", "DR", "GH", "KN", "SK", "SM", "TH",
      "WR", "SCH", "EI", "AU", "EU", "ÜB", "ÄU", "SS", "PF", "TZ",
      "CK", "CHS", "WA", "WO", "WE", "HE", "BI", "BU", "GL", "KL"
    ];
    
    return letters[Math.floor(Math.random()*letters.length)];
  };

  const [letters, setLetters] = useState(generateLetters());

  useEffect(() => {
    inputRef.current?.focus();
  });

  useEffect(() => {
    if (gameOver) return;
    if(progress<=0){
      new Audio("/Word-Bomb/sounds/Explosion.wav").play()
      setLives(lives-1)
      if(lives<=1){
        setGameOver(true)
      } else {
        setLetters(generateLetters())
        setProgress(100)
      }
    }

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(progressInterval);
          return 0;
        }
        return prevProgress - 1;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [progress, gameOver]);

  useEffect(() => {
    if(Object.values(usedLetters).every(value => value === 1)){
      setUsedLetters(reqLetters.reduce((obj, key) => {
        obj[key] = 0;
        return obj;
      }, {}));
      setLives(lives+1);
    }
  }, [usedLetters])

    const checkInput = (event) => {
      if(event.key=="Enter"){
        setInput('')
        var lowerWords = words.map(f=>{ return f.toLowerCase(); });
        if(input.toLowerCase().includes(letters.toLowerCase())) {
          if(lowerWords.includes(input.toLowerCase())){
          if(!usedWords.includes(input.toLowerCase())){
          setUsedWords(prevUsedWords => [...prevUsedWords, input.toLowerCase()]);
          setScore(score + (Math.round(progress/10*input.length)))
          new Audio("/Word-Bomb/sounds/Confirm.wav").play()
          setProgress(100)
          setLetters(generateLetters())
for (let letter of input.split("")) {
  if(letter in usedLetters){
  setUsedLetters(prevUsedLetters => ({
    ...prevUsedLetters,
    [letter]: 1,
  }));
}
}
        }}}
      }
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
    
        {/* Progress Bar */}
        <div className="w-full max-w-xs h-5 mb-4">
          <progress value={progress} max="100" className="w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-400 [&::-webkit-progress-value]:bg-green-500 [&::-moz-progress-bar]:bg-green-500"/>
        </div>
    
        {/* Display Letters */}
        <div className="text-center mb-4  text-white">
          <span className="text-md">Gib mir ein deutsches Wort mit</span><br />
          <span className="text-5xl sm:text-6xl font-bold">{letters}</span>
        </div>
    
        {/* User Input */}
        <div className="mb-4 w-full max-w-xs">
          <input
            autoComplete='off'
            inputMode='text'
            value={input}
            ref={inputRef}
            className="w-full p-2 border rounded-lg text-xl text-white"
            disabled={gameOver}
            onChange={(e) => setInput(e.target.value.replaceAll(' ',''))}
            onKeyDown={checkInput}
          />
        </div>
    
        {/* Lives and Score */}
        <div className="flex justify-center space-x-12 mb-4">
          <div className="text-xl text-white">Leben: <span className="text-3xl font-bold">{lives}</span></div>
          <div className="text-xl text-white">Score: <span className="text-3xl font-bold">{score}</span></div>
        </div>
    
        {/* Display letters used below the input */}
        <div className="mb-4 flex flex-wrap justify-center">
          {Object.keys(usedLetters).map((letter) => (
            <span
              key={letter}
              className={`mx-2 text-lg font-bold ${usedLetters[letter] === 1 ? 'line-through text-stone-400' : ''} text-stone-200`}
            >
              {letter.toUpperCase()}
            </span>
          ))}
        </div>
    
        {/* Game Over Message */}
{gameOver && (
  <div className="flex flex-col items-center">
    <div className="text-red-500 text-2xl font-bold mb-4">
      Game Over!
    </div>
    <button className="cursor-pointer bg-gray-300 px-4 py-2 rounded-lg text-black font-bold transition duration-100 ease-in-out hover:bg-gray-200" 
      onClick={() => window.location.reload()}>
      Nochmal spielen
    </button>
  </div>
)}

      </div>
    );
    
};

export default WordBomb;
