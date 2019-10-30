import React, { useState, useCallback } from 'react';
import Room from './room/Room';
import update from 'immutability-helper';

import Select from 'react-select';

export default function DragAroundNaive() {

  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const [roomDetails, setRoomDetails] = useState({
    elements: [
      { top: 20, left: 80, title: 'Drag me around' },
      { top: 180, left: 20, title: 'Drag me too' }
    ]
  })
  const ids = roomDetails.elements.map( (elem,i) => {return {'label':elem.title, 'value' : i}});
  const toggle = useCallback(() => {
    console.log( 'Toggling field');
    setHideSourceOnDrag(!hideSourceOnDrag)
  });

  const moveRoomItem = (id, left, top) => {
    console.log('Moving Room', id);
    setRoomDetails(
      update(roomDetails, {
        elements: {
          [id]: {
          $merge: { left, top },
        },
      }
      }),
    )
  }

  const addRoomItem = () => {
    setRoomDetails(
      update(roomDetails, {
        elements: {
          $push: [{ left:0, top:0, title:'New Room' }],
      }
      }),
    )
  }
  const removeRoomItem = (elem) =>{
    console.log( 'Remove rooom called',elem);
    setRoomDetails(
      update(roomDetails, {
        elements: {
          $splice: [[elem.value, 1]],
      }
      }),
    )
  }

  console.log( 'Room Details', roomDetails);
  return (
    <div>
      <Room hideSourceOnDrag={hideSourceOnDrag} roomItems={roomDetails} moveRoomItem={moveRoomItem} addRoomItem={addRoomItem} />
      <p>
        <label htmlFor="hideSourceOnDrag">
          <input
            id="hideSourceOnDrag"
            type="checkbox"
            checked={hideSourceOnDrag}
            onChange={toggle}
          />
          <small>Hide the source item while dragging</small>
        </label>
      </p>
      <button onClick={addRoomItem}>Add Room</button>
      <Select options={ids} onChange={removeRoomItem} autoFocus={true}/>
    </div>
  )
}
