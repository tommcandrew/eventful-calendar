import React from "react";

const HoverMessages = ({ hoverMessages }) => {
  return (
    <div className="cell__hover-messages">
      {hoverMessages.map((message, index) => (
        <div key={index + "message"}>{message}</div>
      ))}
    </div>
  );
};

export default HoverMessages;
