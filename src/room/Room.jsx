import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import RoomItem from './RoomItem'
import update from 'immutability-helper'
const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative',
}
const Room = ({ hideSourceOnDrag }) => {
  const [roomsItems, setRoomsItems] = useState({
    a: { top: 20, left: 80, title: 'Drag me around' },
    b: { top: 180, left: 20, title: 'Drag me too' },
  })
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      moveRoomItem(item.id, left, top)
      return undefined
    },
  })
  const moveRoomItem = (id, left, top) => {
    setRoomsItems(
      update(roomItems, {
        [id]: {
          $merge: { left, top },
        },
      }),
    )
  }
  return (
    <div ref={drop} style={styles}>
      {Object.keys(roomsItems).map(key => {
        const { left, top, title } = roomItems[key]
        return (
          <RoomItem
            key={key}
            id={key}
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
