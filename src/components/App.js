import React, { Component } from 'react';
import '../css/App.css';
import Header from '../components/Header';
import GraphicBoard from '../components/GraphicBoard';
import InfoBoard from '../components/InfoBoard';

class App extends Component {

	constructor(){
		super();
		this.state = {
		}
	}

	render(){
		return (
			<div className="App">
				<Header />
				<div className="row">
					<GraphicBoard />
					<InfoBoard />
				</div>
			</div>);
	}
}

export default App;