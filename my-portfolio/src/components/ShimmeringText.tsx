// ShimmeringText.tsx
import React, { useState, useEffect } from "react";

const glyphs = ["₊˚", "✦", "✧", "*:", "☆", "✺", "❖", " "];

interface ShimmeringTextProps {
  text: string;
  className?: string;
  speed?: number; // optional control over shimmer speed
}

const ShimmeringText: React.FC<ShimmeringTextProps> = ({ text, className = "", speed = 40 }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let progress = 0;
    let interval: NodeJS.Timeout;

    // start shimmer from random glyphs to final text
    interval = setInterval(() => {
      setDisplayText(() => {
        const chars = text.split("").map((char, i) => {
          if (i < progress) return char;
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        });
        return chars.join("");
      });

      progress++;
      if (progress > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`inline-block transition-all duration-200 ${className}`}>
      {displayText}
    </span>
  );
};

export default ShimmeringText;
