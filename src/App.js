import './App.css';
import Control from './Control';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { Container } from 'react-bootstrap';

function App() {
	const { selectedObjects, editor, onReady } = useFabricJSEditor();

	editor?.canvas.setWidth(500);
	editor?.canvas.setHeight(500);
	// editor?.canvas.selection.valueOf() = false;
	// console.log(editor?.canvas.selection);
	editor?.canvas.setBackgroundColor('#F9F6EE');

	window.addEventListener('keydown', (event) => {
		if (event.keyCode == 46 && selectedObjects) {
			selectedObjects.map((selectedObject) =>
				editor?.canvas.remove(selectedObject)
			);
		}
	});

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				minHeight: '100vh',
			}}
		>
			<Control
				style={{
					flex: 2,
					backgroundColor: '#041E42',
					color: '#F9F6EE',
				}}
				canvas={editor?.canvas}
			/>
			<Container
				style={{
					flex: 8,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#ADD8E6',
				}}
			>
				<span
					style={{
						boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
					}}
				>
					<FabricJSCanvas
						className='sample-canvas'
						onReady={onReady}
					/>
				</span>
			</Container>
		</div>
	);
}

export default App;
