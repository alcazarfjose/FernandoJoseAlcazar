import React, { useState, useEffect } from "react";
import SkillPills from "./SkillsPills";
const glyphs = ["₊˚", "✦", "✧", "*:", "☆", "✺", "❖", " "]; //"☄"
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
  selectedTitle: string;
  setSelectedTitle: React.Dispatch<React.SetStateAction<string>>
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
  skills: string[];
  text: string;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  hovering: boolean;
  setHovering: React.Dispatch<React.SetStateAction<boolean>>;
};

const images = import.meta.glob("../assets/images/*", { eager: true, import: "default" });

let savedTitle = "";

const GameCard: React.FC<GameCardProps> = ({ index, name, date, bullets, image, link, selectedIndex, selectedTitle, setSelectedTitle, selectedDate, setSelectedDate, skills, text, setSelectedIndex, hovering, setHovering }) => {
  //const [isTop, setIsTop] = useState(false);
  const isTop = selectedIndex === index;
  const [showText, setShowText] = useState(false);
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);

  const updateSelect = (index) => {
    console.log(selectedIndex);
    if (isTop) { setSelectedIndex(-1) } else { setSelectedIndex(index)};
    
  };

  const hoverOn = () => {
    setSelectedTitle(name);
    setSelectedDate(date);
    setHovering(true);
    console.log(selectedTitle);
  };

  const hoverOff = () => {
    if (selectedIndex === -1) { setSelectedTitle(""); setSelectedDate("")}
    setHovering(false);
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
    <div className="w-full group-hover:scale-[1.1] aspect-[16/9] relative content-center overflow-hidden">
      
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
        className={`absolute w-[200%] h-full bg-transparent relative z-0
          transition-transform duration-700 ease-in-out
          [clip-path:polygon(0_0,100%_0,95%_10%,60%_100%,0_100%)]
          ${isTop ? "-translate-x-1/4" : "translate-x-0"}`}
      >
        <button
          onClick={() => updateSelect(index)}
          onMouseEnter={() => {hoverOn();}}
          onMouseMove={(e) => {setTooltip({ x: e.clientX, y: e.clientY });}}
          onMouseLeave={() => {setTooltip(null); hoverOff();}}
          className={`flex group z-20 absolute w-1/2 h-full bg-blue-500 text-white cursor-pointer overflow-hidden
            transition-all duration-450 duration-700 ease-in-out
            ${isTop ? "translate-x-1/2" : "translate-x-0"}`}
        >
          {/* thumbnail image */}
          <img
            src={images[`../assets/images/${image}`]}
            alt="Game Card Thumbnail"
            className="fixed w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-125 group-hover:brightness-110 group-hover:blur-xs"
          />

          {/* overlay with name */}
          <div
            className="static inset-0 flex items-center justify-center bg-black/50
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {/*<span className="text-white text-lg font-bold">{name}</span>*/}
          </div>
        </button>
      </div>

      {/* DATE TOOLTIP */}
      {tooltip && (
        <div
          className="z-20 fixed px-2 py-1 text-sm text-white bg-black pointer-events-none shadow-lg"
          style={{ left: tooltip.x + 12, top: tooltip.y + 12 }}
        >
          {date}
        </div>
      )}
      
    </div>
  );
};

export default GameCard;
