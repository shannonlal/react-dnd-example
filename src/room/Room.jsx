import React from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import RoomItem from './RoomItem'

const Room = ({ roomName, roomId, hideSourceOnDrag, 
                roomItems, moveRoomItem, addRoomItem,
              width, height }) => {

  const styles = {
    width,
    height,
    border: '1px solid black',
    position: 'relative',
  }

  const [, drop] = useDrop({
    accept: [ItemTypes.BOX, ItemTypes.BOX_ADD],
    drop(item, monitor) {

      if( item.type === ItemTypes.BOX_ADD){
        const location = monitor.getClientOffset();
        addRoomItem(roomId, location.x, location.y);
      }else{
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveRoomItem(roomId, item.id, left, top)
        return undefined
      }

    },
  })

  console.log( 'RoomtItems', roomItems);
  console.log( 'Hide Source', hideSourceOnDrag);
  return (
    <div ref={drop} style={styles}>
      {roomItems.map((item, index) => {
        const { left, top, title } = item;
        return (
          <RoomItem
            key={index}
            id={index}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            {title}
          </RoomItem>
        )
      })}
    </div>
  )
}
export default Room;
