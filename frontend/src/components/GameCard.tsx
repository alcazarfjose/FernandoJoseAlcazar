import React, { useState } from "react";

type GameCardProps = {
  name: string;
  date: string;
  image: string; // URL or path to the image
  bullets: string[]; // what type should i put here?
  link: string;
};

const GameCard: React.FC = ({ name, date, bullets, image }) => {
  const [isTop, setIsTop] = useState(false);

  // w-128 h-144
  return (
    <div className="row-span-2 w-full h-144 relative overflow-hidden content-center bg-white">
      <button
        onClick={() => setIsTop(!isTop)}
        className={`z-10 absolute w-full h-1/2 bg-blue-500 text-white cursor-pointer
          transition-all duration-450 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
          ${isTop ? "top-0" : "top-1/2"}`}
      >
        Click
      </button>
      <div className={`
          absolute bottom-0 h-1/2 bg-red-400
          w-[200%]  /* wider than parent */
          transition-transform duration-700 ease-in-out
          [clip-path:polygon(0_0,100%_0,100%_calc(100%-400px),calc(100%-400px)_100%,0_100%)]
          ${isTop ? "-translate-x-80" : "translate-x-0"}
        `}></div>
      <div
        className={`content-center transition-all duration-1000 ${
          isTop ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className={`absolute font-bold top-1/2 text-4xl text-center italic whitespace-nowrap`}>
          {name}
        </h1>
        <ul className="absolute pl-4 list-disc list-inside bottom-1/4 text-m">
        {bullets.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
        </ul>

      </div>
    </div>
  );
};

export default GameCard;
