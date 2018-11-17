import React, { Component } from 'react';
import '../css/Stats.css';

class Stats extends Component {

	renderStats(stats){
		let values = [];
		for(let key in stats){
			values.push(<div className="row">
				<p className="Stats__label col-6">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
				<p className="Stats__text col-6">{stats[key]}</p>
			</div>);
		}
		return values;
	}

	render(){
		return(
			<div className="Stats">
				<header className="Stats__header">Stats</header>
				<div className="Stats__left">
					{this.renderStats(this.props.stats)}
				</div>
			</div>);
	}
}

export default Stats;