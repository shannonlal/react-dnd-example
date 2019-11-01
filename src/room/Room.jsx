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
const Room = ({ hideSourceOnDrag, roomItems, moveRoomItem, addRoomItem }) => {

  const [, drop] = useDrop({
    accept: [ItemTypes.BOX, ItemTypes.BOX_ADD],
    drop(item, monitor) {

      if( item.type === ItemTypes.BOX_ADD){
        console.log( 'monitor', monitor);
        //const delta = monitor.getDifferenceFromInitialOffset()
        ///const left = Math.round( delta.x)
        //const top = Math.round( delta.y)

        //console.log( `ADD left ${left} top ${top}`);

        //const off = monitor.getInitialClientOffset();
        //console.log('off',off);
        //console.log( 'result', monitor.getDropResult());
        const location = monitor.getClientOffset();
        console.log( 'cleint off', monitor.getClientOffset());
        //console.log( 'source', monitor.getSourceClientOffset());
        addRoomItem(location.x, location.y);
      }else{
        console.log( 'item', item);
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveRoomItem(item.id, left, top)
        return undefined
      }

    },
  })

  console.log( 'RoomtItems', roomItems);
  console.log( 'Hide Source', hideSourceOnDrag);
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
