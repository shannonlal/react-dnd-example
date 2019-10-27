
	import React from 'react'
	import ReactDOM from 'react-dom'
	import RoomExample from './RoomExample';
	import { DndProvider } from 'react-dnd';
	import HTML5Backend from 'react-dnd-html5-backend';
	//import SingleTargetExample from './SingleTargetExample';
	// import MultipleTargetExample from './MultipleTargetExample';
	
	function App() {
		return (
			<div className="App">
				<DndProvider backend={HTML5Backend}>
					<RoomExample />
				</DndProvider>
			</div>
		)
	}
	
	const rootElement = document.getElementById('root')
	ReactDOM.render(<App />, rootElement)	
