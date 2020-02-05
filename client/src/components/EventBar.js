import React from "react";
import { Draggable } from "react-beautiful-dnd";

const EventBar = ({ index, event }) => {
  console.log("eventbar");
  return (
    <Draggable index={index} draggableId={event.id} key={event.id}>
      {provided => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          key={index + "event-title"}
          className="cell__event-title"
        >
          <span> {event.title}</span>
          {event.time && <span> {event.time && event.time}</span>}
          {event.icon && <span> {event.icon && event.icon}</span>}
        </div>
      )}
    </Draggable>
  );
};

export default EventBar;
