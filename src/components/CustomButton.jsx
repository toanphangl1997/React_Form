import React from "react";

const CustomButton = ({
  type = "button",
  bgClr = "bg-green-400",
  onClick,
  content,
  isDisabled = false,
}) => {
  return (
    <button
      type={type}
      className={`px-5 py-2 ${bgClr} text-white font-semibold rounded-md disabled:opacity-75`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {content}
    </button>
  );
};

export default CustomButton;
