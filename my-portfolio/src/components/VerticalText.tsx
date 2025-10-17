import React, { useEffect, useState } from "react";

type VerticalLabelProps = {
  text: string;
  color?: string;
  bgcolor?: string;
};

const VerticalLabel: React.FC<VerticalLabelProps> = ({ 
  text, 
  color = "text-black", 
  bgcolor = "bg-(--saffron)" 
}) => {
  const [shimmerText, setShimmerText] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      // Break into characters
      const chars = text.split("");

      // Randomly add/remove spaces between characters
      let newText = (Math.random() < 0.3 ? "   " : "") +
        chars
          .map((char) => {
            let randomNum = Math.random();
            if (randomNum < 0.3) {
              return char + "   ";
            } else if (0.3 <= randomNum && randomNum <= 0.4) {
              return " ₊˚ " + char;
            } else if (0.4 < randomNum && randomNum <= 0.5) {
              return " *: " + char;
            } else if (0.5 < randomNum && randomNum <= 0.52) {
              return " “☆ " + char;
            }
            return char;
          })
          .join("");

      setShimmerText(newText);
    }, 200); // adjust speed here (ms)

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div
      className={`w-full h-full ${bgcolor} group cursor-pointer content-center opacity-0 hover:opacity-100
        transition-opacity duration-100 p-2`}
    >
      <span
        className={`block text-9xl font-bold break-words ${color}`}
      >
        {shimmerText}
      </span>
    </div>
  );
};

export default VerticalLabel;
