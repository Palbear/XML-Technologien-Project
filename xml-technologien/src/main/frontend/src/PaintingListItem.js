import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './PaintingListItem.css';

class PaintingListItem extends Component {
	
	constructor(props) {
		  super(props);
		}
	
	render() {
		return (
			<div className="PaintingListItem">				
				{this.props.name}
			</div>
		);
	}
}

export default PaintingListItem;