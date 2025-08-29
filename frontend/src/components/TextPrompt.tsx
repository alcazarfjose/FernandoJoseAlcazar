import React from "react";

type TextPromptProps = {
  label: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const TextPrompt: React.FC<TextPromptProps> = ({ label, setShow }) => {
  return (
    <p
      onClick={() => setShow(true)}
      className="cursor-pointer text-gray hover:text-blue-600"
    >
      {label}
    </p>
  );
};

export default TextPrompt;
