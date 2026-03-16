import React from "react";

const HoverButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-2 py-1
        rounded-md
        text-sm
        transition
        ${
          active
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-muted-foreground hover:bg-muted"
        }
      `}
    >
      {label}
    </button>
  );
};

export default HoverButton;
