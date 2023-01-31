import React from 'react';
import { useState } from 'react';
import { fabric } from 'fabric';
import {
	Accordion,
	Button,
	Col,
	Form,
	Row,
	Image,
	Container,
} from 'react-bootstrap';
import { RiBringToFront, RiSendToBack, RiUnderline } from 'react-icons/ri';
import { FaBold, FaItalic, FiItalic } from 'react-icons/fa';
// FaBold, FiItalic

function Control(props) {
	const [shape, setShape] = useState('rectangle');
	const [shapeColor, setShapeColor] = useState('#000000');
	const [text, setText] = useState('');
	const [fontFamily, setFontFamily] = useState('Rubik');
	const [fontSize, setFontSize] = useState('20');
	const [textColor, setTextColor] = useState('#000000');
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);
	const canvas = props.canvas;
	const imageURLS = [
		'img1.jpg',
		'img2.jpg',
		'img3.jpg',
		'img4.jpg',
		'img5.jpeg',
		'img6.jpg',
	];

	return (
		<div className='control' style={props.style}>
			<h2 style={{ padding: '0.5rem 1rem' }}>Controls</h2>
			<Container style={{ padding: '10px 10px' }}>
				<Row>
					<Col>
						<RiBringToFront
							style={{ fontSize: '25px' }}
							onClick={(e) => {
								e.preventDefault();
								bringForward(canvas);
							}}
						/>
					</Col>
					<Col>
						<RiSendToBack
							style={{ fontSize: '25px' }}
							onClick={(e) => {
								e.preventDefault();
								sendBackwards(canvas);
							}}
						/>
					</Col>
				</Row>
				<Row>
					<Col>Bring Forward</Col>
					<Col>Send Backward</Col>
				</Row>
				<Row>
					<Col>
						<Button
							variant='primary'
							type='submit'
							onClick={(e) => {
								e.preventDefault();
								convertToJPEG(canvas);
							}}
						>
							Convert to JPEG
						</Button>
					</Col>
				</Row>
			</Container>
			<Accordion defaultActiveKey='0'>
				<Accordion.Item eventKey='0'>
					<Accordion.Header>Shapes</Accordion.Header>
					<Accordion.Body>
						<Form>
							<Form.Group className='mb-3'>
								<Form.Label>Shape</Form.Label>
								<Form.Select
									aria-label='Default select example'
									onChange={(e) => {
										console.log(e.target.value);
										setShape(e.target.value);
									}}
								>
									<option value='rectangle'>Rectangle</option>
									<option value='square'>Square</option>
									<option value='circle'>Circle</option>
									<option value='triangle'>Triangle</option>
									<option value='elipse'>Elipse</option>
								</Form.Select>
								<Form.Label>Color</Form.Label>
								<Form.Control
									type='color'
									value={shapeColor}
									onChange={(e) =>
										setShapeColor(e.target.value)
									}
								/>
							</Form.Group>
							<Button
								variant='primary'
								type='submit'
								onClick={(e) => {
									e.preventDefault();
									addShape(shape, shapeColor, canvas);
								}}
							>
								Add
							</Button>
						</Form>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey='1'>
					<Accordion.Header>Text</Accordion.Header>
					<Accordion.Body>
						<Form>
							<Form.Group className='mb-3'>
								<Row>
									<Col>
										<Form.Label>Text</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter text here'
											onChange={(e) =>
												setText(e.target.value)
											}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Label>Font Size</Form.Label>
									</Col>
									<Col>
										<Form.Label>Color</Form.Label>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Control
											type='number'
											value={fontSize}
											min={0}
											onChange={(e) =>
												setFontSize(e.target.value)
											}
										/>
									</Col>
									<Col>
										<Form.Control
											type='color'
											value={textColor}
											onChange={(e) =>
												setTextColor(e.target.value)
											}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Label>Font Style</Form.Label>
									</Col>
								</Row>
								<Row>
									<Col>
										<Button
											style={{
												width: 50,
												margin: '0px 0.5rem',
												display: 'inline-flex',
												justifyContent: 'center',
												alignItems: 'center',
												backgroundColor: isBold
													? 'grey'
													: '#EDEADE',
												color: isBold
													? 'white'
													: 'black',
												border: 'none',
											}}
											onClick={() => setIsBold(!isBold)}
										>
											<FaBold />
										</Button>
										<Button
											style={{
												width: 50,
												margin: '0px 0.5rem',
												display: 'inline-flex',
												justifyContent: 'center',
												alignItems: 'center',
												backgroundColor: isItalic
													? 'grey'
													: '#EDEADE',
												color: isItalic
													? 'white'
													: 'black',
												border: 'none',
											}}
											onClick={() =>
												setIsItalic(!isItalic)
											}
										>
											<FaItalic />
										</Button>
										<Button
											style={{
												width: 50,
												margin: '0px 0.5rem',
												fontSize: '17px',
												display: 'inline-flex',
												justifyContent: 'center',
												alignItems: 'center',
												backgroundColor: isUnderline
													? 'grey'
													: '#EDEADE',
												color: isUnderline
													? 'white'
													: 'black',
												border: 'none',
											}}
											onClick={() =>
												setIsUnderline(!isUnderline)
											}
										>
											<RiUnderline />
										</Button>
									</Col>
								</Row>
							</Form.Group>
							<Button
								variant='primary'
								type='submit'
								onClick={(e) => {
									e.preventDefault();
									if (!text) return;
									addText(
										text,
										fontFamily,
										fontSize,
										isBold,
										isItalic,
										isUnderline,
										textColor,
										canvas
									);
								}}
							>
								Add
							</Button>
						</Form>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey='2'>
					<Accordion.Header>Image</Accordion.Header>
					<Accordion.Body>
						<div
							className='d-flex-col justify-content-center align-items-center'
							style={{ overflowX: 'hidden', overflowY: 'auto' }}
						>
							{imageURLS.map((url) => {
								return (
									<Image
										src={`images\\${url}`}
										fluid={true}
										style={{
											width: '45%',
											margin: '2%',
										}}
										onClick={() => addImage(url, canvas)}
									/>
								);
							})}
						</div>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</div>
	);
}
function addShape(shape, color, canvas) {
	switch (shape) {
		case 'rectangle':
			const rect = new fabric.Rect({
				top: 10,
				left: 10,
				width: 100,
				height: 50,
				fill: `${color}`,
				hasControls: true,
			});
			rect.onSelect = function () {
				canvas.bringToFront(this);
			};
			canvas.add(rect);
			break;
		case 'square':
			const square = new fabric.Rect({
				top: 10,
				left: 10,
				width: 100,
				height: 100,
				fill: `${color}`,
			});
			square.onSelect = function () {
				canvas.bringToFront(this);
			};
			canvas.add(square);
			break;
		case 'circle':
			var circle = new fabric.Circle({
				top: 10,
				left: 100,
				radius: 50,
				fill: `${color}`,
			});
			circle.onSelect = function () {
				canvas.bringToFront(this);
			};
			canvas.add(circle);
			break;
		case 'triangle':
			var triangle = new fabric.Triangle({
				top: 10,
				left: 200,
				width: 100,
				height: 86.6,
				fill: `${color}`,
			});
			triangle.onSelect = function () {
				canvas.bringToFront(this);
			};
			canvas.add(triangle);
			break;
		case 'elipse':
			var elipse = new fabric.Ellipse({
				top: 150,
				left: 10,
				rx: 100,
				ry: 50,
				fill: `${color}`,
			});
			elipse.onSelect = function () {
				canvas.bringToFront(this);
			};
			canvas.add(elipse);
			break;
	}
}

function addText(
	content,
	fontFamily,
	fontSize,
	isBold,
	isItalic,
	isUnderline,
	color,
	canvas
) {
	const text = new fabric.Text(content, {
		left: 10,
		top: 10,
		fill: `${color}`,
		fontSize: fontSize,
		fontFamily: fontFamily,
		fontWeight: isBold ? 'bold' : '',
		fontStyle: isItalic ? 'italic' : '',
		underline: isUnderline,
	});
	text.onSelect = function () {
		canvas.bringToFront(this);
	};
	canvas.add(text);
}

function addImage(url, canvas) {
	new fabric.Image.fromURL(`images\\${url}`, (img) => {
		let i = 1;
		while (img.getScaledWidth() > 300) {
			img.scale(1 / i);
			i++;
		}
		img.onSelect = function () {
			canvas.bringToFront(this);
		};
		canvas.add(img);
		canvas.renderAll();
	});
}

function bringToFront(canvas) {
	const activeObject = canvas?.getActiveObject();
	if (!activeObject) return;
	canvas.bringToFront(activeObject);
}

function bringForward(canvas) {
	const activeObject = canvas?.getActiveObject();
	if (!activeObject) return;
	canvas.bringForward(activeObject);
}

function sendToBack(canvas) {
	const activeObject = canvas?.getActiveObject();
	if (!activeObject) return;
	canvas.sendToBack(activeObject);
}

function sendBackwards(canvas) {
	const activeObject = canvas?.getActiveObject();
	if (!activeObject) return;
	canvas.sendBackwards(activeObject);
}

function convertToJPEG(canvas) {
	var url = canvas.toDataURL({
		format: 'jpeg',
		quality: 0.8,
	});
	console.log(url);
}

export default Control;
