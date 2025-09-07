import React, { useState, useEffect } from "react";
const glyphs = ["₊˚", "✦", "✧", "*:", "☆", "☄", "✺", "❖", " "];
// https://manonghignoni.wixsite.com/portfolio

type GameCardProps = {
  name: string;
  date: string;
  image: string;
  bullets: string[];
  link: string;
};

const images = import.meta.glob("../assets/images/*", { eager: true, import: "default" });

const GameCard: React.FC<GameCardProps> = ({ name, date, bullets, image, link }) => {
  const [isTop, setIsTop] = useState(false);
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);

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
        onClick={() => setIsTop(!isTop)}
        onMouseMove={(e) => setTooltip({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setTooltip(null)}
        className={`z-10 absolute w-full h-1/2 bg-blue-500 text-white cursor-pointer overflow-hidden
          transition-all duration-450 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
          ${isTop ? "top-0" : "top-1/2"}`}
      >
        <img
          src={images[`../assets/images/${image}`]}
          alt={"Game Card Thumbnail"}
          className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out hover:scale-125 hover:brightness-110"
        />
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
        <a href={"https://itch.io"} target="_blank" rel="noopener noreferrer">
          <img
            src={images[`../assets/images/${"itchPanel.png"}`]}
            alt={"Itch Panel"}
            className="w-full absolute bottom-0 right-0 translate-x-1/8 translate-y-3/8 hover:scale-130 transition-transform duration-150 ease-in-out"
          />
        </a>

        {/* snipped cover */}
        <div
          className={`absolute bottom-0 h-full bg-(--saffron)
            w-[200%] transition-transform duration-700 ease-in-out translate-y-2
            [clip-path:polygon(0_0,100%_0,100%_40%,40%_100%,0_100%)]
            ${isTop ? "-translate-x-80" : "translate-x-0"}`}
        />

        {/* name */}
        <h1
          className={`absolute font-bold top-0 text-4xl text-(--davys-gray) text-center whitespace-nowrap`}
        >
          {displayName}
        </h1>

        {/* bullet points */}
        <ul
          className={`rounded-md font-sans font-semibold text-(--davys-gray) absolute top-1/4 pl-4 ml-4 list-none text-m space-y-2 transition-all duration-1500 ease-in-out
          ${isTop ? "translate-x-0" : "translate-x-80"}`}
        >
          {bullets.map((desc, index) => {
            const [glyph, setGlyph] = useState(glyphs[0]);

            useEffect(() => {
              const interval = setInterval(() => {
                setGlyph(glyphs[Math.floor(Math.random() * glyphs.length)]);
              }, 400 + Math.random() * 600); // async updates
              return () => clearInterval(interval);
            }, []);

            return (
              <li key={index} className="before:mr-2 before:inline-block relative hover:bg-white">
                <span className="absolute -left-4">{glyph}</span>
                {desc}
              </li>
            );
          })}
        </ul>

      </div>
    </div>
  );
};

export default GameCard;
