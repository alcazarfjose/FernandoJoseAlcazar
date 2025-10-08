import React, { useState, useRef, useEffect } from "react";
import GameCard from "./components/GameCard";
import projects from "./assets/gameData.json";
import ShimmeringText from "./components/ShimmeringText";

function App() {

  const [selectedIndex, setSelectedIndex] = useState(-1)
  const handleSelect = (id) => {
    setSelectedIndex(id);
  };

  return (
    <main className="flex min-h-screen">

      {/* left section - fixed info display */}
      <section className="w-2/5 fixed top-0 left-0 h-screen bg-gray-100 p-8 overflow-y-auto">
        {(selectedIndex !== null) && <ShimmeringText text={(selectedIndex == -1) ? "fern" : projects[projects.length - selectedIndex + 1].title} /> }
        {/* FERN INFO */}
        {(selectedIndex == -1) && <div>

        </div>}

        {/* PROJECT INFO */}
        {(selectedIndex != -1) && <div>

        </div>}
      </section>

      {/* right section - gallery */}
      <aside className="ml-[40%] w-3/5 bg-white border-l border-gray-200 p-8">
        <h2 className="text-xl font-semibold">Sidebar</h2>
        <p>Scrollable content area.</p>

        <div>
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
              skills={project.skills}
              text={project.text}
              setSelectedIndex={setSelectedIndex}
            />
          ))}
        </div>
      </aside>
    </main>
  )
}

export default App
