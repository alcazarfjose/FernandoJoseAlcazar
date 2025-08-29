import React, { useState } from "react";
import TextPrompt from "./components/TextPrompt";

function App() {
  const [intro01, setIntro01] = useState(false); // hello.
  const [intro02, setIntro02] = useState(false); // my name is fern.
  const [intro03, setIntro03] = useState(false); // i make small games
  const [intro04, setIntro04] = useState(false); // for ideas i think are cool
  const [intro05, setIntro05] = useState(false); // here are some of them.

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
      <TextPrompt label="hello. " setShow={setIntro01} />
      {intro01 && <TextPrompt label="my name is fern. " setShow={setIntro02} />}
      {intro02 && <TextPrompt label="i make small games. " setShow={setIntro03} />}
      {intro03 && <TextPrompt label="for ideas i think are cool. " setShow={setIntro04} />}
      {intro04 && <TextPrompt label="here are some of them. " setShow={setIntro05} />}
    </div>
  )
}

export default App
