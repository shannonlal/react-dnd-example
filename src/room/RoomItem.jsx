import React, { useState } from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "./ItemTypes";
const style = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move"
};
const RoomItem = ({ roomId, id, left, top, hideSourceOnDrag,removeRoomItem, children }) => {
  //console.log(`ID ${id} Left ${left} Top ${top}`);
  const [showMenu, setShowMenu] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.BOX },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  const displayMenu = () => {
    console.log( 'Display menu');
    if(!showMenu){
      setShowMenu(true);
    }
  }

  const closeMenu = () => {
    console.log( 'Closing menu');
    setShowMenu(false);
  }

  const deleteItem = () =>{
    removeRoomItem(roomId, id);
    setShowMenu(false);
  }
  return (
    <div ref={drag} style={{ ...style, left, top }} onClick={displayMenu} >
      {children}
      {
        showMenu ? (
          <div className="menu">
            <button onClick={deleteItem}> Delete Item </button>
            <button onClick={closeMenu}> Close </button>
          </div>
        )
        : (
          null
        )
      }
    </div>
  );
};
export default RoomItem;