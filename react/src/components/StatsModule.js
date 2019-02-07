import React, { Component } from 'react';
import '../css/StatsModule.css';

class StatsModule extends Component {

	renderStats(stats){
		let values = [];
		for(let key in stats){
			values.push(<div className="row">
				<p className="StatsModule__label col-6">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
				<p className="StatsModule__text col-6">{stats[key]}</p>
			</div>);
		}
		return values;
	}

	render(){
		return(
			<div className="StatsModule">
				<header className="StatsModule__header">Stats</header>
				<div className="StatsModule__left">
					{this.renderStats(this.props.stats)}
				</div>
			</div>);
	}
}

export default StatsModule;