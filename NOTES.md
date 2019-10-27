## Target

### Part1
Create the Target component with the following components:
i. connectDropTarget (fn)
ii. highlighted: a boolean that highlights the colors
ii. shape: The shape (string) of the target

### Part 2 - for target
Wrap the Target component with a higher order component from DropTarget.  It has the following:
- ITEM: string
- target: Defines the target portion of the event payload (eg. the shape of the target)
- collect: Specifies the drag and drop properties (e.g. connectDropTarget and highlighted)  supplied to the Target component.

## Source

### Part 1 the Source
Stateless functional component is to create a stateless functional component with the following properties:

color: The color string
connectDragSource: a function that is used to setup the source DOM node
isDragging: a boolean indicating that the source component has been dragged.


### Part 2 
- ITEM: The string that tags the target; again used to match sources and targets
- source: Defines the source portion of the target with the beginDrag.  endDrag, onDrop
- collect: Specifies the drag and drop properties. 

Additional  Notes:

Sample project 

Source Component - Source component will be a draggable component.  In my world this would be desks, tables, chairs, stands, etc.

Target Component - Source components will be dragged to the target component.  This will be the room.

Container component - Parent component which will manage source and target component

### Concepts
DragSource: A HOC which wraps around the source component
DragTarget: DragTarget is a HOC  which wraps around our target component
DragDropContext: Wraps around our container component

```
// Example using DragSource

export default DragSource("SOURCE", cardSource, collect)(Source);
```

Notes: First variable, "SOURCE" is the unique string id


Target Component:
Accepts props to render inside component

spec function
- drop( props, monitor, component)
drop is called when the source is dropped inside the target component.  We get the item whcih is dropped using monitor.getItem().  It then calles the function onDrop on parent component.

- collect( connect, monitor)

connectDropTarget - is required to handle drop events.
Other events like isOver, isOverCurrent

Drag and Drop


Shannon - Madeline - 

# React DND with Hooks API

## Items and Types
Item of a certain type is being dragged
-item - simple Javascript object
 - types - Allows you to group items and specify behavioiur

## Monitors
Monitors allow you to update the props of your components in response to drag and drop state changes.

For each component that needs to track the drag and drop state, you can  define a collecting function that retrieves bits of information from the monitors.

## Connectors
Connectors allow you to assign one of the predefined roles to each DOM node.  Here are the connectors roles: a drag source, a drag preview, or a drop target


connectDropTarget: tells React DND that the root DOM node of our component is a valid drop target and that its hover and drop events should be handled by its backend.  

## Drag Sources and Drop Targets

They tie the types, items, side effects and collecting functions together.  

### Drag Source
When ever you want to make some part of it draggable you need to wrap some part of it in a drag source declaration.  Every drag source is regsitered for a certain type and has to implement methods producing an item from its props.  It can also specify a few other methods for handling drag and drop events.  You can also specify the collecting function.  

### Drop Targets
Drop Targets are similar to drag sources except for a drop target may register for several item types at once.  and instead of producing an item it may handle its hover or drop 

## DND React Hooks

### useDrag
A hook to use the current component as a drag source


#### Parameters:
spec

spec.item - Mandatory.  Should be very minimal.  Item only only {id, type}

spec.item.type - String or ES6 symbol.  Note:  Only drop targets registered to the same type will respond to this drop target

spec.previewOptions - Describes drag preview options

spec.options - 

spec.begin( monitor ) - function.   Fired when drag operations begin.  Nothing needs to be returned, but if it is it will override the item

spec.end( monitor) - function. When dragging stops, end is called.  For every begin there is an end call and is gaurenteed.  
Note: monitor.didDrop() is a good place to check if the drop was handled by a compatible drop event.  

spec.canDrag(monitor) - function.  Use it to specify whether dragging is allowed.  If dragging is always allowed, specify it.  

spec.isDragging - 

spec.collect - It should return the props for injecting into your component.  

#### Return:
An array.  
[0] - an object containing the collected properties from the collect function.  If no collect  it returns an empty object
[1] - A connector function for the drag source.  Must be attached to a draggable portion of the DOM

[2] - A connector function for dragPreview.  

### useDrop

#### Parameters
spec
spec.accept - string, ES6 symbol, array or function to determine whether it will accept the drag source

spec.options - 

spec.drop (item, monitor) - Called when a compatibile object is dropped on the target.  
Note: If you want to implement different behaviour whenever the end drop is complete you need to return an object.  This object must have the endDrag 

spec.hover (item, monitor) - Called when an item is hovered over the item.  

spec.canDrop (item, monitor) - Used to specify whether the item can drop

#### Return
An Array - 
[0] - An object container the collected props
[1] - a connector function for the drop target


## Monitoring State

### DragSourceMonitor

This is an object passed into the collecting function for the dragsource

#### Methods: 

canDrag() - Returns true if no drag process is in progress

isDragging() - Returns true if dragging is in progress

getItemType() - Returns string or ES6 symbol

getItem() - Returns the item

getDropResult() - Returns an object representing the last drop result

didDrop() - returns true if some target handled the drop event

### DragTargetMonitor

This is the object passed to the collecting function for the drop target.

canDrop() - Returns true if the drag operation in progress

isOver(options) - Returns true if drag opeartion in progress


