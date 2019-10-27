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
  const [roomItems, setRoomItems] = useState({
    elements: [
      { top: 20, left: 80, title: 'Drag me around' },
      { top: 180, left: 20, title: 'Drag me too' }
    ]
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
    setRoomItems(
      update(roomItems, {
        elements: {
          [id]: {
          $merge: { left, top },
        },
      }
      }),
    )
  }

  const addRoomItem = (title) => {
    setRoomItems(
      update(roomItems, {
        elements: {
          $push: { left:0, top:0, title },
      }
      }),
    )
  }
  return (
    <div ref={drop} style={styles}>
      {roomItems.elements.map((item, index) => {
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
