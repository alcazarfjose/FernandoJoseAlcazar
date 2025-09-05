import React from "react";

type VerticalLabelProps = {
  text: string;
  color?: string; // tailwind color class like "text-red-500"
  pos: string;
};

const VerticalLabel: React.FC<VerticalLabelProps> = ({ text, pos, color = "text-black" }) => {
  return (
    <div
      className={`relative w-fit h-full group cursor-pointer`}
    >
      {/* Invisible area you hover over */}
      <div className="absolute inset-0"></div>

      {/* Label (hidden until hover) */}
      <span
        className={`absolute left-full ml-2 text-8xl opacity-0 group-hover:opacity-100 
        transition-opacity duration-0 whitespace-nowrap ${color} ${pos}`}
        style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
      >
        {text}
      </span>
    </div>
  );
};

export default VerticalLabel;