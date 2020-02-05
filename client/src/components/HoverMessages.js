import React from "react";

const HoverMessages = ({ hoverMessages }) => {
  return (
    <div className="cell__hover-messages">
      {hoverMessages.map((message, index) => (
        <div key={index + "message"}>
          <em>{message}</em>
        </div>
      ))}
    </div>
  );
};

export default HoverMessages;
