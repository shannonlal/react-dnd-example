import React from 'react';
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}

const Dustbin = () => {
    /**
     * useDrop - Target hook
     * item return from collect function
     * - canDrop
     * - isOver
     * accept - Mandatory
     * drop() => returns item
     */
    const [{ canDrop, isOver }, drop] = useDrop({
      accept: ItemTypes.BOX,
      drop: () => ({ name: 'Dustbin' }),
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    })
    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }
    console.log( `isActive ${isActive}`);
    return (
      <div ref={drop} style={{ ...style, backgroundColor }}>
        {isActive ? 'Release to drop' : 'Drag a box here'}
      </div>
    )
  }
  export default Dustbin;