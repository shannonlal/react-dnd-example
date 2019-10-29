import React, { useState, useCallback } from 'react';
import Room from './room/Room';
import update from 'immutability-helper'
export default function DragAroundNaive() {
  //const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const [roomDetails, setRoomDetails] = useState({
    hideSourceOnDrag: true,
    elements: [
      { top: 20, left: 80, title: 'Drag me around' },
      { top: 180, left: 20, title: 'Drag me too' }
    ]
  })
  const toggle = useCallback(() => setRoomDetails({hideSourceOnDrag:!roomDetails.hideSourceOnDrag}));

  const moveRoomItem = (id, left, top) => {
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

  const addRoomItem = (title) => {
    setRoomDetails(
      update(roomDetails, {
        elements: {
          $push: { left:0, top:0, title },
      }
      }),
    )
  }

  console.log( 'Room Details', roomDetails);
  return (
    <div>
      <Room hideSourceOnDrag={roomDetails.hideSourceOnDrag} roomItems={roomDetails} moveRoomItem={moveRoomItem} addRoomItem={addRoomItem} />
      <p>
        <label htmlFor="hideSourceOnDrag">
          <input
            id="hideSourceOnDrag"
            type="checkbox"
            checked={roomDetails.hideSourceOnDrag}
            onChange={toggle}
          />
          <small>Hide the source item while dragging</small>
        </label>
      </p>
    </div>
  )
}
