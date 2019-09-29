import React, { useState, useCallback } from 'react';
import Room from './Room';
import update from 'immutability-helper'
export default function RoomExample() {
  //const [hideSourceOnDrag, setHideSourceOnDrag, ] = useState(true)
  const [roomDetails, setRoomDetails, ] = useState({
    hideSourceOnDrag:false,
    rooms: {
        a: { top: 20, left: 80, title: 'Drag me around' },
        b: { top: 180, left: 20, title: 'Drag me too' },
    },
    roomsIndex:2,
  })
  const toggle = useCallback(() => setRoomDetails({hideSourceOnDrag:!roomDetails.hideSourceOnDrag}), [
    roomDetails.hideSourceOnDrag
  ])

  const addRoom = () => {
    console.log( 'Adding Rooms', roomDetails.rooms);
    const room = {
        top: 10,
        left: 20,
        title: `Room Id ${roomDetails.roomsIndex}`
    };

    roomDetails.rooms[roomDetails.roomsIndex] = room;
    console.log( 'Rooms', roomDetails.rooms);
    setRoomDetails({rooms: roomDetails.rooms, roomsIndex:roomDetails.roomsIndex++});
};

const moveRoom = (id, left, top) => {
    setRoomDetails(
      update(roomDetails.rooms, {
        [id]: {
          $merge: { left, top },
        },
      }),
    )
  }

  return (
    <div>
      <Room hideSourceOnDrag={roomDetails.hideSourceOnDrag} rooms={roomDetails.rooms} moveRoom={moveRoom} />
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
        <p>
            <button onClick={addRoom} >Add Room</button>
        </p>
    </div>
  )
}
