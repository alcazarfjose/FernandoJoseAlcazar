import React, { useState } from "react";

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

  return (
    <div className="row-span-2 w-full aspect-[9/10] relative content-center">
      {/* THUMBNAIL */}
      <button
        onClick={() => setIsTop(!isTop)}
        onMouseMove={(e) => setTooltip({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setTooltip(null)}
        className={`z-10 absolute w-full h-1/2 bg-blue-500 text-white cursor-pointer
          transition-all duration-450 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
          ${isTop ? "top-0" : "top-1/2"}`}
      >
        Click
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
        className={`content-center transition-all duration-1000 outline-2 outline-tertiary w-full h-1/2 absolute bottom-0 overflow-hidden ${
          isTop ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* link */}
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img
            src={images[`../assets/images/${"itchPanel.png"}`]}
            alt={"Itch Panel"}
            className="w-full absolute bottom-0 right-0 translate-x-1/8 translate-y-3/8"
          />
        </a>

        {/* snipped cover */}
        <div
          className={`absolute bottom-0 h-full bg-background
            w-[200%] transition-transform duration-700 ease-in-out
            [clip-path:polygon(0_0,100%_0,100%_40%,40%_100%,0_100%)]
            ${isTop ? "-translate-x-80" : "translate-x-0"}`}
        />

        {/* DESCRIPTION */}
        <h1
          className={`absolute font-bold top-0 text-4xl text-center italic whitespace-nowrap transition-all duration-1000 ease-in-out
          ${isTop ? "translate-x-0" : "translate-x-80"}`}
        >
          {name}
        </h1>

        <ul
          className={`absolute top-1/4 pl-4 list-none text-m space-y-2 transition-all duration-1500 ease-in-out
          ${isTop ? "translate-x-0" : "translate-x-80"}`}
        >
          {bullets.map((desc, index) => (
            <li
              key={index}
              className="before:content-['-'] before:mr-2 before:inline-block"
            >
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameCard;
