'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');

class Painting extends React.Component{
	constructor(props) {
	    super(props);
	  }
	render() {
		return (
			<tr>
				<td>{this.props.painting.title ? this.props.painting.title : ''}</td>
				<td>{this.props.painting.artist ? this.props.painting.artist : ''}</td>
				<td>{this.props.painting.date ? this.props.painting.date : ''}</td>
				<td>{this.props.painting.category ? this.props.painting.category : ''}</td>
				<td>{this.props.painting.inscription ? this.props.painting.inscription : ''}</td>
				<td>{this.props.painting.depicted_person ? this.props.painting.depicted_person : ''}</td>
				<td>{this.props.painting.technique_material ? this.props.painting.technique_material : ''}</td>
				<td>{this.props.painting.measurements ? this.props.painting.measurements : ''}</td>
				<td>{this.props.painting.right_work ? this.props.painting.right_work : ''}</td>
			</tr>
		)
	}
}

Painting.propTypes = {
	painting: PropTypes.object
};

export default Painting;