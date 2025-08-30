import React, { useState } from "react";
import GameCard from "./components/GameCard";
import TextPrompt from "./components/TextPrompt";

function App() {
  const [intro01, setIntro01] = useState(false); // hello.
  const [intro02, setIntro02] = useState(false); // my name is fern.
  const [intro03, setIntro03] = useState(false); // i make small games
  const [intro04, setIntro04] = useState(false); // for ideas i think are cool
  const [intro05, setIntro05] = useState(false); // here are some of them.

  return (
    <div className="h-screen w-screen relative">
      <TextPrompt label="hello. " setShow={setIntro01} rules="absolute top-31 left-40 w-full text-black text-5xl font-semibold" />
      {intro01 && <TextPrompt label="my name is fern. " setShow={setIntro02} rules="absolute top-45 left-60 w-full text-black text-5xl font-semibold"/>}
      {intro02 && <TextPrompt label="i make small games. " setShow={setIntro03} rules="absolute top-60 left-200 w-full text-black text-5xl font-semibold"/>}
      {intro03 && <TextPrompt label="for ideas i think are cool. " setShow={setIntro04} rules="absolute top-80 left-180 w-full text-black text-5xl font-semibold" />}
      {intro04 && <TextPrompt label="here are some of them. " setShow={setIntro05} rules="absolute top-130 left-150 w-full text-black text-5xl font-semibold" />}

      { intro05 && <div className="absolute top-200 grid grid-cols-3 grid-rows-4 gap-15 p-4">
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </div> }
    </div>
  )
}

export default App
