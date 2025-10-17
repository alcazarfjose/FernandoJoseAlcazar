import React from "react";

type TextPromptProps = {
  label: string;
  rules: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const TextPrompt: React.FC<TextPromptProps> = ({ label, setShow, rules }) => {
  return (
    <div
      onClick={() => setShow(true)}
      className={`relative cursor-pointer ${rules}`}
    >
      {/* Background layer */}
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-50 transition-opacity duration-100 z-10" />

      {/* Text layer */}
      <span className="relative">{label}</span>
    </div>
  );
};

export default TextPrompt;
