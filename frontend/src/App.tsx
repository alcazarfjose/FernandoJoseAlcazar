import React, { useState, useRef, useEffect } from "react";
import GameCard from "./components/GameCard";
import TextPrompt from "./components/TextPrompt";
import VerticalLabel from "./components/VerticalText";

function App() {
  const [intro01, setIntro01] = useState(false); // hello.
  const [intro02, setIntro02] = useState(false); // my name is fern.
  const [intro03, setIntro03] = useState(false); // i make small games
  const [intro04, setIntro04] = useState(false); // for ideas i think are cool
  const [intro05, setIntro05] = useState(false); // here are some of them.
  const [gridShow, setGridShow] = useState(false); // here are some of them.

  const gridRef = useRef<HTMLDivElement | null>(null);

  // 👇 watch intro05 — when it flips true, scroll into view
  useEffect(() => {
    if (gridShow && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [gridShow]);

  return (
    <div className="h-screen w-screen relative overflow-x-hidden bg-background">
      {/*<TextPrompt label="hello. " setShow={setIntro01} rules="z-10 absolute top-15 left-40 w-full text-black text-5xl font-semibold" />
      {intro01 && <TextPrompt label="my name is fern. " setShow={setIntro02} rules="z-10 absolute top-25 left-60 w-full text-black text-5xl font-semibold"/>}
      {intro02 && <TextPrompt label="i make small games. " setShow={setIntro03} rules="z-10 absolute top-40 left-200 w-full text-black text-5xl font-semibold"/>}
      {intro03 && <TextPrompt label="for ideas i think are cool. " setShow={setIntro04} rules="z-10 absolute top-50 left-180 w-full text-black text-5xl font-semibold" />}
      {intro04 && <TextPrompt label="here are some of them. " setShow={setIntro05} rules="z-10 absolute top-70 left-150 w-full text-black text-5xl font-semibold" />}*/}

      <div className="absolute h-full top-0 grid grid-cols-5 grid-rows-1 w-screen" ref={gridRef}>
        <div onClick={() => setGridShow(true)}><VerticalLabel text="gamer" color="text-(--saffron)" bgcolor="bg-(--light-sea-green)"/></div>
        <div onClick={() => setGridShow(true)}><VerticalLabel text="coder" color="text-purple-500" bgcolor="bg-(--bittersweet)"/></div>
        <div onClick={() => setGridShow(true)}><VerticalLabel text="mentor" color="text-(--saffron)" bgcolor="bg-(--raspberry)"/></div>
        <div onClick={() => setGridShow(true)}><VerticalLabel text="designer" color="text-(--color-tertiary)" bgcolor="bg-(--color-primary)"/></div>
        <div onClick={() => setGridShow(true)}><VerticalLabel text="daydreamer" color="text-(--bittersweet)" bgcolor="bg-(--saffron)"/></div>
      </div>
      <div className="absolute w-screen aspect-[9/10] top-full bg-(--saffron)">
        <TextPrompt label="hello. " setShow={setIntro01} rules="z-10 w-full text-black text-5xl font-semibold" />
          {intro01 && <TextPrompt label="my name is fern. " setShow={setIntro02} rules="z-10  w-full text-black text-5xl font-semibold"/>}
          {intro02 && <TextPrompt label="i make small games. " setShow={setIntro03} rules="z-10  w-full text-black text-5xl font-semibold"/>}
          {intro03 && <TextPrompt label="for ideas i think are cool. " setShow={setIntro04} rules="z-10 w-full text-black text-5xl font-semibold" />}
          {intro04 && <TextPrompt label="here are some of them. " setShow={setIntro05} rules="z-10 w-full text-black text-5xl font-semibold" />}
          {intro05 && <TextPrompt label="enjoy. " setShow={setIntro05} rules="z-10 w-full text-black text-5xl font-semibold" />}
      </div>

      { gridShow && <div className="absolute top-full grid grid-cols-3 grid-rows-4 w-screen" ref={gridRef}>
        <GameCard
          name="what do you want to do tonight?"
          date="Sept 3, 2025"
          image="Umbrella.gif"
          bullets={["A two-player microgame social game set in rural California", "Ideate and quick-prototype diverse gesture-driven actions", "Build assets and tools for retro PS1-era aesthetic", "Develop multiplayer interface using Unity Netcode API"]}
        />
        <GameCard
          name="what do you want to do tonight?"
          date="Sept 3, 2025"
          image="sheep.gif"
          bullets={["A two-player microgame social game set in rural California", "Ideate and quick-prototype diverse gesture-driven actions", "Build assets and tools for retro PS1-era aesthetic", "Develop multiplayer interface using Unity Netcode API"]}
        />
        <GameCard
          name="what do you want to do tonight?"
          date="Sept 3, 2025"
          image="Product__AdjustmentDisorder01.gif"
          bullets={["A two-player microgame social game set in rural California", "Ideate and quick-prototype diverse gesture-driven actions", "Build assets and tools for retro PS1-era aesthetic", "Develop multiplayer interface using Unity Netcode API"]}
        />
        <GameCard
          name="what do you want to do tonight?"
          date="Sept 3, 2025"
          image="majorRedwick.gif"
          bullets={["A two-player microgame social game set in rural California", "Ideate and quick-prototype diverse gesture-driven actions", "Build assets and tools for retro PS1-era aesthetic", "Develop multiplayer interface using Unity Netcode API"]}
        />
      </div> }
    </div>
  )
}

export default App
