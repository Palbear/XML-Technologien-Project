import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './PaintingListItem.css';

class PaintingListItem extends Component {
	
	constructor(props) {
		  super(props);
		}
	
	render() {
		var url = 
			"http://collection.nationalmuseum.se/eMuseumPlus?service=ExternalInterface&module=collection&objectId=" + 
			this.props.recordId + 
			"&viewType=detailView";
		
		return (
			<div className="PaintingListItem">					
				EN: {this.props.nameEn}
				<br />
				SU: {this.props.name}
				<br />
				<a href={url} className="button">Nationalmuseum record info</a>
			</div>
		);
	}
}

export default PaintingListItem;