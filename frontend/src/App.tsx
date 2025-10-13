import React, { useState, useRef, useEffect } from "react";
import {motion} from "framer-motion";
import GameCard from "./components/GameCard";
import projects from "./assets/gameData.json";
import ShimmeringText from "./components/ShimmeringText";
import SocialButton from "./components/LinkButton";

function App() {



  const keywords = ["unity", "netcode", "relay", "ui"];

  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [selectedTitle, setSelectedTitle] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [hovering, setHovering] = useState(false)
  const handleSelect = (id) => {
    setSelectedIndex(id);
  };

  const socials = [
    { image: `socialIcons__Itch.svg`, link: "https://cannedcorgies.itch.io/", color: "#fa5c5c" },
    { image: `socialIcons__GitHub.svg`, link: "https://github.com/alcazarfjose", color: "#6cc644" },
    { image: `socialIcons__YouTube.svg`, link: "https://www.youtube.com/@cannedcorgies", color: "#ff0033" },
    { image: `socialIcons__LinkedIn.svg`, link: "https://www.linkedin.com/in/alcazarfjose/", color: "#0077b0" }
  ];

  const glyphs = ["₊˚", "✦", "✧", "*:", "☆", "✺", "❖", " "]; //"☄"
  const glyphRefs = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    const intervals = glyphRefs.current.map((span) => {
      if (!span) return null;
      return setInterval(() => {
        const newGlyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        span.textContent = newGlyph;
      }, 400 + Math.random() * 600);
    });

    return () => intervals.forEach((id) => id && clearInterval(id));
  }, [projects, selectedIndex]);

  return (
    <main className="flex min-h-screen">

      {/* left section - fixed info display */}
      <section className="w-2/5 fixed flex flex-col top-0 left-0 h-screen bg-gray-100 p-8 overflow-y-auto text-7xl">

        {/* HEADER */}
        <div className="w-full h-1/4">
          {(selectedIndex !== null) && <ShimmeringText text={(selectedIndex == -1) ? "hi. my name is fern." : projects[projects.length - selectedIndex + 1].subtitle} /> }
        </div>

        {/* VARIABLE INFO */}
        <motion.div
          key={selectedIndex} // re-triggers animation when index changes
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-1/2"
        >

          {/* FERN INFO */}
          {(selectedIndex == -1) && <div>
            <p className="">i make games. for small ideas i think are cool</p>
          </div>}

          {/* PROJECT INFO */}
          {(selectedIndex != -1) && <div className="relative w-full h-full">

            {/* bullet points */}
            <ul className="space-y-8">
              {projects[projects.length - selectedIndex + 1].bullets.map((desc, index) => (
                <li key={index} className="text-[clamp(1.25rem,1.5vw,2.5rem)] before:mr-5 before:inline-block relative group">
                  <span
                    ref={(el) => (glyphRefs.current[index] = el)}
                    className="absolute -left-4"
                  >
                    {glyphs[0]}
                  </span>
                  {desc.split(" ").map((word, i) => {
                    const isKeyword = keywords.includes(word.toLowerCase());
                    return (
                      <span
                        key={i}
                        className={`transition-colors duration-100 drop-shadow-md ${
                          isKeyword
                            ? "group-hover:text-[--color-light-background] group-hover:bg-white"
                            : ""
                        }`}
                      >
                        {word}{" "}
                      </span>
                    );
                  })}
                </li>
              ))}
            </ul>

            {/* SKILLS STRIP */}
            <div className="absolute bottom-0 flex gap-2 mt-3 bottom-5 overflow-visible z-50 marquee-container content-center
              cursor-pointer
              transition-transform duration-300 ease-in-out
              hover:scale-105">
                <div className="flex gap-2 text-[--color-light-background] font-bold group-hover:scale-110 marquee-content">
                  {projects[projects.length - selectedIndex + 1].skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-3xl rounded-full bg-gray-800 text-white font-medium whitespace-nowrap shadow-md group-hover:shadow-lg group-hover:shadow-[--color-light-background]/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
            </div>

          </div>}
        
        </motion.div>

        {/* SOCIALS */}
        <div className="w-full h-1/4 bg-blue-500 flex flex-row overflow-hidden">
          {socials.map((s, i) => (
            <SocialButton key={i} image={s.image} link={s.link} color={s.color}/>
          ))}
        </div>

      </section>

      {/* right section - gallery */}
      <aside className="ml-[40%] w-3/5 bg-white border-gray-200 p-8 flex">
        <h1 className="fixed text-9xl w-1/3 break-words text-bold z-20" >
          {`${(!hovering && selectedIndex != -1) ? projects[projects.length - selectedIndex + 1].title : selectedTitle}` }
        </h1>
        <h1 className="fixed w-1/4 text-right top-1/2 left-2/5 text-9xl w-1/3 break-words text-bold z-0 text-gray-200">
          {`${(!hovering && selectedIndex != -1) ? projects[projects.length - selectedIndex + 1].date : selectedDate}`}
        </h1>

        <div className="w-1/2 ml-auto space-y-32 z-30">
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
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
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
