import React, { useState, useCallback } from 'react';
import Room from './room/Room';
import update from 'immutability-helper';
import AddBox from './room/AddBox';

import Select from 'react-select';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function DragAroundNaive() {

  /**
   * { top: 20, left: 80, title: 'Drag me around' },
      { top: 180, left: 20, title: 'Drag me too' }
   */
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const [roomDetails, setRoomDetails] = useState({
    rooms: [{
      name:'Room 1',
      elements: [
      
      ]
    },
    {
      name:'Room 2',
      elements: [
      
      ]
    }
    ]

  })
  //const ids = roomDetails.elements.map( (elem,i) => {return {'label':elem.title, 'value' : i}});
  const toggle = useCallback(() => {
    console.log( 'Toggling field');
    setHideSourceOnDrag(!hideSourceOnDrag)
  });

  const moveRoomItem = (roomId, id, left, top) => {
    console.log(`Moving Room ${roomId} Element ${id} Left ${left} top ${top}`);
    setRoomDetails(
      update(roomDetails, {
        rooms: {
          [roomId]: {
            elements: {
              [id]: {
              $merge: { left, top },
            },
          }
        }
      }
      }),
    )
  }

  const addRoomItem = (roomId, left=0, top=0) => {
    console.log( `Adding Item to Room ${roomId} Left ${left} Top ${top}`);
    setRoomDetails(
      update(roomDetails, {
        rooms: {
          [roomId]: {
            elements: {
              $push: [{ left, top, title:'New Room' }],
            }
          }
        }
      }),
    )
  }
  const removeRoomItem = (roomId, itemId) =>{
    console.log( `Remove rooom called room ${roomId} id ${itemId}`);

    setRoomDetails(
      update(roomDetails, {
        rooms: {
          [roomId]: {
            elements: {
              $splice: [[itemId, 1]],
            }
          }
        }
      }),
    )
  }

  console.log( 'Room Details', roomDetails);
  return (
    <div>
     {/* } <TransformWrapper defaultScale={1} defaultPositionX={200} defaultPositionY={100}>

      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <TransformComponent>
      <div> */}
      {
        roomDetails.rooms.map((room, index)=>{
          console.log( 'Room Being Rendered ', room);
          return(<Room key={index} name={room.roomName} roomId={index}
                      height={300} width={300}
                      roomItems={room.elements} moveRoomItem={moveRoomItem} 
                      addRoomItem={addRoomItem} hideSourceOnDrag={hideSourceOnDrag}
                      removeRoomItem={removeRoomItem}/>)
        })
      }

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
      <div>
        <AddBox name="Add" />
       {/*} <div className="tools">
              <button onClick={zoomIn}>+</button>
              <button onClick={zoomOut}>-</button>
              <button onClick={resetTransform}>x</button>
            </div>
    </div>*/}
      <button onClick={addRoomItem}>Add Room</button>
      {/*<Select options={ids} onChange={removeRoomItem} autoFocus={true}/>*/}
      </div>
      {/*</TransformComponent>
      </React.Fragment>
      )}
      </TransformWrapper>*/}
    </div>
  )
}
