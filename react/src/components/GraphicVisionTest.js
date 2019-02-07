import React, {Component} from 'react';
import GraphicVisionItem from '../components/GraphicVisionItem.js'
import {VisionItems} from "../data/Vision.js";
import {Goals} from "../data/Goals.js";
import "../css/GraphicVision.css";

class GraphicVision extends Component {

	constructor(){
		super();

		//The current state of the graphic vision
		this.state = {
			selected: 1
		};
		this.segments = [];
	}

	//Once the canvas element has actually been rendered
	//update the canvas
    componentDidMount() {
    	this.setupSegments();
    	this.updateCanvas();
    	this.setupEventHandlers();
    }

    //Setups the segments with their starting and ending angles and the information
    //necessary to render them
   	setupSegments(){
   		let startAngle = 0;

		for (const index in VisionItems[this.state.selected]['goals']){

			const importance = Goals[index]['importance']; //The importance is the % of the circle the segment should take up
			const progress = Goals[index]['progress']; //The progress is how much of the importance should actually be drawn
			const endAngle = startAngle + Math.ceil(importance * 360);
			const endAngleProgress = startAngle + Math.ceil(progress * importance * 360);
			const deltaAngle = endAngle - startAngle;

			this.segments.push(
			{
				name: Goals[index]['name'],
				progress: progress,
				start: startAngle,
				end: endAngle,
				endProgress: endAngleProgress,
				delta: deltaAngle
			}
			);
			startAngle += deltaAngle;
		}
   	}

    setupEventHandlers(){
    	//Get the canvas element
    	let canvas = document.getElementsByTagName("canvas")[0];

    	//Get the position of the canvas left and right
		const canvasTop = canvas.offsetTop;
		const canvasLeft = canvas.offsetLeft;

		//Get the width and height of the canvas
		const width = this.refs.canvas.width;
		const height = this.refs.canvas.height;

		//Calculate the center of the canvas - which is the center of our circle
		const centerX = width / 2;
		const centerY = height / 2;

		canvas.addEventListener('click', (e) => {
			//Get the coordinates on the canvas
			const canvasX = e.pageX - canvasLeft;
			const canvasY = e.pageY - canvasTop;

			//Get the coordinates relative to the center of the canvas
			//Up being positive y and right being positive left
			const circleX = canvasX - centerX;
			const circleY = centerY - canvasY;

			//We then want to get the angle from the center of the circle based on these coordinates
			const angle = this.getAngle(circleX,circleY);

			for (let i = 0; i < this.segments.length; i++){
				const segment = this.segments[i];

				//If the current angle of our coordinates falls within the angle start and end of a segment,
				//then we are in that segment
				if (angle >= segment['start'] && angle <= segment['end']){
					alert(segment['name']);
				}
			}

		});
    }

	updateCanvas(){
		let context = this.refs.canvas.getContext("2d");
		const width = this.refs.canvas.width;
		const height = this.refs.canvas.height;
		const centerX = width / 2;
		const centerY = height / 2;
		const radius = 150;
		const borderGap = 3;
		const lineWidth = 50;
		const totalColor = "#FC4A1A";
		const progressColor = "#FF00FF";
		const font="14px Sans-Serif";
		const fontColor = "white";

		for (let i = 0; i < this.segments.length; i++){
			const segment = this.segments[i];

			this.paintSegment(context, centerX, centerY, radius, lineWidth, totalColor, segment['start'] + borderGap, segment['end']);
			this.paintSegment(context, centerX, centerY, radius, lineWidth, progressColor, segment['start'] + borderGap, segment['endProgress']);

			const arcAngleCenter = segment['start'] + (segment['delta'] / 2);
			const arcPoint = this.getPoint(radius, arcAngleCenter);

			const percentProgress = segment['progress'] * 100;

			this.paintText(context, segment['name'], font, fontColor, centerX, centerY, arcPoint.x, arcPoint.y);
			this.paintText(context, `${percentProgress}% complete`, font, fontColor, centerX, centerY, arcPoint.x, arcPoint.y + 20);
		}
	}	

	//Paints a segment to canvas
	//This function is a little funky, as it draws from 0 degrees clockwise around the circle
	//instead of counter clockwise
	paintSegment(context, centerX, centerY, radius, lineWidth, color, angleStart, angleEnd){
		context.beginPath();
		context.arc(centerX, centerY, radius, this.toRadians(angleStart), this.toRadians(angleEnd));
		context.lineWidth = lineWidth;
		context.strokeStyle = color;
		context.stroke();
	}

	//Paints text to the canvas
	paintText(context, text, font, color, xs, ys, xd, yd){
		context.save();
		context.translate(xs, ys);
		context.font = font;
		context.fillStyle = color;
		context.rotate(2 * Math.PI);
		context.textAlign = "center";
		context.fillText(text, xd, yd );
		context.restore();
	}

	//Gives the x and y coordinate on a circle of a radius at a specific angle
	getPoint(radius, angle){

		const x = radius * Math.cos(this.toRadians(angle));
		const y = radius * Math.sin(this.toRadians(angle));
		return {
			x : x,
			y : y
		}
	}

	//Gets the angle from the center of a circle
	getAngle(x, y){
		//Arc tanget only has a range from -pi/2 to pi/2 therefore we will keep
		//our calculations in the first quadrant and then add the coordesponding offset of angle
		//based on the sign of the quadrant

		//Calculate abs of the coordinates to get angle in first quadrant
		const xAbs = Math.abs(x);
		const yAbs = Math.abs(y);
		let angle = this.toDegrees(Math.atan(yAbs/xAbs));
		
		//Since the paint function draws counter clockwise we have to edit the angle
		//based on that circle abstraction
		if (x > 0 && y > 0){
			angle += 270;
		} else if (x < 0 && y < 0){
			angle+= 90;
		} else if (x < 0){
			angle +=180;
		}
		return angle;
	}

	//Converts degrees to radians
	toRadians(degrees){
		return (degrees * Math.PI) / 180;
	}

	//Converts radians to degrees
	toDegrees(radians){
		return (radians * 180) / Math.PI;
	}

	renderItems(){
		let items = [];
		for (const index in VisionItems[this.state.selected]['goals']){
			items.push(this.renderItem(index));
		}
		return items;
	}

	renderItem(index){
		const name = Goals[index]['name'];
		return (<GraphicVisionItem text={name}/>);
	}

	render(){
		return (
			<div className="GraphicVision">
				<div className="GraphicVision__graphic">
					<div className="GraphicVision__circle">
						<img className="GraphicVision__circle-img" alt="Vision Item" src="https://placeimg.com/250/250/any"/>
						<div className="GraphicVision__circle-text">{VisionItems[this.state.selected]['name']}</div>
					</div>
					<canvas className="GraphicVision__canvas" ref="canvas" width="350" height="350"></canvas>
				</div>
				<div className="GraphicVision__bar">
					<div className="GraphicVision__header">
						<img className="GraphicVision__header-img" alt="Vision Item" src="https://placeimg.com/250/250/any"/>
						<div className="GraphicVision__header-text">Hi</div>
					</div>
					<div className="GraphicVision__items">
						{this.renderItems()}
					</div>
				</div>
			</div>);
	}
}

export default GraphicVision;