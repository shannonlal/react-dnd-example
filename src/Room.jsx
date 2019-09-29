import React from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'

import RoomItem from './RoomItem'
const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative',
}
const Room = ({ hideSourceOnDrag, rooms, moveRoom }) => {

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      moveRoom(item.id, left, top)
      return undefined
    },
  })

  return (
    <div ref={drop} style={styles}>
      {Object.keys(rooms).map(key => {
        const { left, top, title } = rooms[key]
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
