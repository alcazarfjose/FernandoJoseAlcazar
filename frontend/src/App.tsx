import React, { useState, useRef, useEffect } from "react";
import GameCard from "./components/GameCard";
import TextPrompt from "./components/TextPrompt";

function App() {
  const [intro01, setIntro01] = useState(false); // hello.
  const [intro02, setIntro02] = useState(false); // my name is fern.
  const [intro03, setIntro03] = useState(false); // i make small games
  const [intro04, setIntro04] = useState(false); // for ideas i think are cool
  const [intro05, setIntro05] = useState(false); // here are some of them.

  const gridRef = useRef<HTMLDivElement | null>(null);

  // 👇 watch intro05 — when it flips true, scroll into view
  useEffect(() => {
    if (intro05 && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [intro05]);

  return (
    <div className="h-screen w-screen relative overflow-x-hidden">
      <TextPrompt label="hello. " setShow={setIntro01} rules="absolute top-15 left-40 w-full text-black text-5xl font-semibold" />
      {intro01 && <TextPrompt label="my name is fern. " setShow={setIntro02} rules="absolute top-25 left-60 w-full text-black text-5xl font-semibold"/>}
      {intro02 && <TextPrompt label="i make small games. " setShow={setIntro03} rules="absolute top-40 left-200 w-full text-black text-5xl font-semibold"/>}
      {intro03 && <TextPrompt label="for ideas i think are cool. " setShow={setIntro04} rules="absolute top-50 left-180 w-full text-black text-5xl font-semibold" />}
      {intro04 && <TextPrompt label="here are some of them. " setShow={setIntro05} rules="absolute top-70 left-150 w-full text-black text-5xl font-semibold" />}

      { intro05 && <div className="absolute top-full grid grid-cols-3 grid-rows-4 w-screen" ref={gridRef}>
        <GameCard
          name="what do you want to do tonight?"
          date="Sept 3, 2025"
          image="-"
          bullets={["A two-player microgame social game set in rural California", "Ideate and quick-prototype diverse gesture-driven actions", "Build assets and tools for retro PS1-era aesthetic", "Develop multiplayer interface using Unity Netcode API"]}
        />
        <GameCard
          name="what do you want to do tonight?"
          date="Sept 3, 2025"
          image="-"
          bullets={["A two-player microgame social game set in rural California", "Ideate and quick-prototype diverse gesture-driven actions", "Build assets and tools for retro PS1-era aesthetic", "Develop multiplayer interface using Unity Netcode API"]}
        />
      </div> }
    </div>
  )
}

export default App
