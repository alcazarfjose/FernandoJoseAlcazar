import React, { useState, useRef, useEffect } from "react";
import GameCard from "./components/GameCard";
import projects from "./assets/gameData.json";
import ShimmeringText from "./components/ShimmeringText";

function App() {

  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [selectedTitle, setSelectedTitle] = useState("")
  const [hovering, setHovering] = useState(false)
  const handleSelect = (id) => {
    setSelectedIndex(id);
  };

  return (
    <main className="flex min-h-screen">

      {/* left section - fixed info display */}
      <section className="w-2/5 fixed top-0 left-0 h-screen bg-gray-100 p-8 overflow-y-auto text-7xl">
        {(selectedIndex !== null) && <ShimmeringText text={(selectedIndex == -1) ? "hi. my name is fern." : projects[projects.length - selectedIndex + 1].subtitle} /> }
        {/* FERN INFO */}
        {(selectedIndex == -1) && <div>

        </div>}

        {/* PROJECT INFO */}
        {(selectedIndex != -1) && <div>

        </div>}
      </section>

      {/* right section - gallery */}
      <aside className="ml-[40%] w-3/5 bg-white border-l border-gray-200 p-8 flex">
        <h1 className="fixed text-9xl w-1/3 break-words text-bold">{`${(!hovering && selectedIndex != -1) ? projects[projects.length - selectedIndex + 1].title : selectedTitle}`}</h1>

        <div className="w-1/2 ml-auto">
          {projects?.map((project) => (
            <GameCard
              key={project.id}
              index={project.id}
              name={project.title}
              date={project.date}
              image={project.image}
              link={project.link}
              bullets={project.bullets}
              selectedIndex={selectedIndex}
              selectedTitle={selectedTitle}
              setSelectedTitle={setSelectedTitle}
              skills={project.skills}
              text={project.text}
              setSelectedIndex={setSelectedIndex}
              hovering = {hovering}
              setHovering = {setHovering}
            />
          ))}
        </div>
      </aside>
    </main>
  )
}

export default App
