import React, { useState } from "react";

const GameCard: React.FC = () => {
  const [isTop, setIsTop] = useState(false);

  return (
    <div className="row-span-2 w-128 h-144 bg-blue relative overflow-hidden">
      <button
        onClick={() => setIsTop(!isTop)}
        className={`absolute w-full h-1/2 bg-blue-500 text-white cursor-pointer
          transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
          ${isTop ? "top-0" : "top-1/2"}`}
      >
        Click
      </button>
    </div>
  );
};

export default GameCard;
