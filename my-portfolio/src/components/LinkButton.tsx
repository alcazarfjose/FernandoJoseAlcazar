import React from "react";

interface SocialButtonProps {
  image: string;
  link: string;
  alt?: string;
  color?: string;
}
const images = import.meta.glob("../assets/images/*", { eager: true, import: "default" });

const SocialButton: React.FC<SocialButtonProps> = ({ image, link, alt, color }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ backgroundColor: color || "#000000ff" }}
      className="group relative flex items-center justify-center 
                 w-full h-full bg-white shadow-md 
                 hover:scale-110 hover:shadow-lg 
                 transition-transform duration-300 ease-out"
    >
      <img
        src={images[`../assets/images/${image}`]}
        alt={alt || "Social Icon"}
        className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
      />
      {/* hover overlay */}
      <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
    </a>
  );
};

export default SocialButton;
