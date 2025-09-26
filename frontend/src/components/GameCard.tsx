import React, { useState, useEffect } from "react";
import SkillPills from "./SkillsPills";
const glyphs = ["₊˚", "✦", "✧", "*:", "☆", "☄", "✺", "❖", " "];
// https://manonghignoni.wixsite.com/portfolio

const keywords = ["unity", "netcode", "relay", "ui"];

type GameCardProps = {
  index: number;
  name: string;
  date: string;
  image: string;
  bullets: string[];
  link: string;
  selectedIndex: number | null;
  skills: string[];
  text: string;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

const images = import.meta.glob("../assets/images/*", { eager: true, import: "default" });

const GameCard: React.FC<GameCardProps> = ({ index, name, date, bullets, image, link, selectedIndex, skills, text, setSelectedIndex }) => {
  //const [isTop, setIsTop] = useState(false);
  const isTop = selectedIndex === index;
  const [showText, setShowText] = useState(false);
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);

  const updateSelect = (index) => {
    console.log(selectedIndex);
    if (isTop) { setSelectedIndex(-1) } else { setSelectedIndex(index)};
    
  };

  // title bubbling
  const [displayName, setDisplayName] = useState(name);
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTop) {
      // opening: start from glyph chaos --> name
      let progress = 0;
      interval = setInterval(() => {
        setDisplayName((prev) => {
          const chars = name.split("").map((char, i) => {
            if (i < progress) return char; // lock in revealed letters
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          });
          return chars.join("");
        });
        progress++;
        if (progress > name.length) clearInterval(interval);
      }, 40);
    } else {
      // closing: name --> glyph chaos --> blank
      let progress = name.length;
      interval = setInterval(() => {
        setDisplayName((prev) => {
          const chars = name.split("").map((char, i) => {
            if (i < progress) return char;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          });
          return chars.join("");
        });
        progress--;
        if (progress < 0) clearInterval(interval);
      }, 40);
    }

    return () => clearInterval(interval);
  }, [isTop, name]);

  return (
    <div className="row-span-2 w-full aspect-[9/10] relative content-center">
      {/* THUMBNAIL */}
      <button
        onClick={() => updateSelect(index)}
        onMouseMove={(e) => setTooltip({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setTooltip(null)}
        className={`group z-20 absolute w-full h-1/2 bg-blue-500 text-white cursor-pointer overflow-hidden
          transition-all duration-450 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
          ${isTop ? "top-0 drop-shadow-xl" : "top-1/2"}`}
      >
        {/* thumbnail image */}
        <img
          src={images[`../assets/images/${image}`]}
          alt="Game Card Thumbnail"
          className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-125 group-hover:brightness-110 group-hover:blur-xs"
        />

        {/* overlay with name */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/50
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="text-white text-lg font-bold">{name}</span>
        </div>
      </button>


      {/* DATE TOOLTIP */}
      {tooltip && (
        <div
          className="z-20 fixed px-2 py-1 text-sm text-white bg-black pointer-events-none shadow-lg"
          style={{ left: tooltip.x + 12, top: tooltip.y + 12 }}
        >
          {date}
        </div>
      )}

      {/* CONTENT */}
      <div
        className={`content-center transition-all duration-500 outline-0 outline-tertiary w-full h-1/2 absolute bottom-0 overflow-hidden ${
          isTop ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* link */}
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img
            src={images[`../assets/images/${"itchPanel.png"}`]}
            alt={"Itch Panel"}
            className="w-full absolute bottom-0 left-45 scale-85 translate-x-1/8 translate-y-3/8 hover:scale-95 transition-transform duration-150 ease-in-out"
          />
        </a>

        {/* snipped cover */}
        <div
          className={`absolute bottom-0 h-full bg-(--color-background)
            w-[200%] transition-transform duration-700 ease-in-out translate-y-2
            [clip-path:polygon(0_0,100%_0,95%_10%,60%_100%,0_100%)]
            ${isTop ? "-translate-x-80" : "translate-x-0"}`}
        >

          {/* date */}
          <div className={`absolute w-1/4 top-10 right-110 text-right inline-block text-(--color-light-background) textfont-bold text-6xl text-wrap`}>
            {date}
          </div>

          {/* bullet points */}
          <ul
            className={`w-1/2 rounded-md font-sans font-semibold text-(--davys-gray) absolute top-1/4 pl-4 ml-4 text-2xl list-none text-m space-y-7 transition-all duration-1500 ease-in-out cursor-pointer
              ${isTop ? "translate-x-0" : "translate-x-80"}`}
          >
            {bullets.map((desc, index) => {
              const [glyph, setGlyph] = useState(glyphs[0]);

              useEffect(() => {
                const interval = setInterval(() => {
                  setGlyph(glyphs[Math.floor(Math.random() * glyphs.length)]);
                }, 400 + Math.random() * 600);
                return () => clearInterval(interval);
              }, []);

              return (
                <li
                  key={index}
                  className="before:mr-5 before:inline-block relative group left-[45%]"
                >
                  <span className="absolute -left-4">{glyph}</span>

                  {desc.split(" ").map((word, i) => {
                    const isKeyword = keywords.includes(word.toLowerCase());
                    return (
                      <span
                        key={i}
                        className={`
                          transition-colors duration-100 drop-shadow-md
                          ${isKeyword ? "group-hover:text-[--color-light-background] group-hover:bg-white" : ""}
                        `}
                      >
                        {word}{" "}
                      </span>
                    );
                  })}
                </li>
              );
            })}
          </ul>

          {/* SKILLS STRIP */}
          <div className="absolute flex left-80 gap-2 mt-3 bottom-5 overflow-visible z-10 marquee-container content-center 
          cursor-pointer
          transition-transform duration-300 ease-in-out 
          hover:scale-105">
            <div className="flex gap-2 text-[--color-light-background] font-bold group-hover:scale-110 marquee-content">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xl rounded-full bg-gray-800 text-white font-medium whitespace-nowrap shadow-md group-hover:shadow-lg group-hover:shadow-[--color-light-background]/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* name */}
        <h1
          className={`absolute font-bold top-5 left-5 text-5xl text-(--davys-gray) text-center whitespace-nowrap drop-shadow-lg`}
        >
          {displayName}
        </h1>

        

      </div>
      {/* post mortem */}
      {isTop && (
        <div className="absolute top-full w-full h-1/2 bg-[--color-background] flex items-center justify-center overflow-hidden z-30">
          <div className="relative flex flex-col items-center w-3/4 h-3/4">
            {/* sliding/fading panel */}
            <div
              className={`transition-all duration-500 ease-in-out transform origin-top
                ${showText ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"}
                w-full h-3/4 p-4 flex flex-col z-30`}
            >
              {showText && (
                <div className="flex-1 overflow-y-auto pr-2 max-h-full">
                  <p className="text-(--davys-gray) whitespace-pre-line">{text}</p>
                </div>
              )}
            </div>

            {/* toggle button */}
            <button
              onClick={() => setShowText(!showText)}
              className={`absolute top-1/2 z-30
                          px-6 py-3 border border-(--davys-gray) bg-(--color-background) 
                          hover:bg-(--color-light-background) text-(--davys-gray) rounded-full 
                          transition-all duration-500 ease-in-out cursor-pointer
                          transform ${showText ? "translate-y-20" : "translate-y-0 animate-pulse"}`}
            >
              {showText ? "Close" : "Post Mortem"}
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default GameCard;
