'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
//const Painting = require('./Painting');
const PropTypes = require('prop-types');
const client = require('../client');
import Painting from './Painting.js'
import {Button} from "react-bootstrap";

//tag::painting-list[]
class PaintingTable extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {paintings: []};
	  }
	componentDidMount() {
		client({method: 'GET', path: '/api/paintings'}).done(response => {
			this.setState({paintings: response.entity._embedded.paintings});
		});
	}
	//<Painting key={painting._links.self.href} painting={painting}/>
	render() {
		var paintings = this.state.paintings.map( (painting) =>
		<Painting key={painting._links.self.href} painting={painting}/>
		);
		return (
				<div>
				<div>
				  <table>
					<tbody>
						<tr>
							<th>Title</th>
							<th>Artist/Maker</th>
							<th>Date</th>
							<th>Category</th>
							<th>Inscription</th>
							<th>Depicted Person</th>
							<th>Technique/Material</th>
							<th>Measurements</th>
							<th>Rights work</th>
						</tr>
						{paintings}
					</tbody>
				  </table>
				</div>
				  <Button bsStyle="success">Next</Button>
				</div>
		)
	}
}

PaintingTable.propTypes = {
	paintings: PropTypes.array
};

export default PaintingTable;