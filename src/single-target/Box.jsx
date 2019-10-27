import React from 'react';
import { useDrag } from 'react-dnd';
// Used by the drag source
import ItemTypes from './ItemTypes';
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};


const Box = ({ name }) => {

    /**
     * useDrag is a DND hook.  It takes in the object and requires the following:
     * item - name/id and type
     * Optional functions 
     * end - Called when dragging stops
     * collect - function A plane old Javascript.  It should return the properties 
     * to inject in your component
     */
    const [{ isDragging }, drag] = useDrag({
      item: { name, type: ItemTypes.BOX },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();

        console.log( 'What is drop Result', dropResult);
        if (item && dropResult) {
          alert(`You dropped ${item.name} into ${dropResult.name}!`)
        }
      },
      collect: monitor => ({ 
        isDragging: monitor.isDragging(),
      }),
    })
    const opacity = isDragging ? 0.4 : 1
    console.log( `isDragging ${isDragging}. name ${name}`);
    return (
      <div ref={drag} style={{ ...style, opacity }}>
        {name}
      </div>
    )
  }
  export default Box


