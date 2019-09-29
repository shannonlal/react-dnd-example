import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "./ItemTypes";
const style = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move"
};
const RoomItem = ({ id, left, top, hideSourceOnDrag, children }) => {
  console.log(`ID ${id} Left ${left} Top ${top}`);
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.BOX },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div ref={drag} style={{ ...style, left, top }}>
      {children}
    </div>
  );
};
export default RoomItem;