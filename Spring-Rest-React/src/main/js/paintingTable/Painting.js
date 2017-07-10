'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');

class Painting extends React.Component{
	constructor(props) {
	    super(props);
	  }
	render() {
		var url = 
			"http://collection.nationalmuseum.se/eMuseumPlus?service=ExternalInterface&module=collection&objectId=" + 
			this.props.painting.recordID + 
			"&viewType=detailView";
		return (
			<tr itemScope itemType="http://schema.org/Painting">
				<td>
					<span itemProp="name">{this.props.painting.title ? this.props.painting.title : ''}</span>			
					<br/>
					<p className="text-link">
						<a itemProp="url" href={url} className="button">Museum link</a>
					</p>
				</td>
				<td>
					<div itemProp="creator" itemScope itemType="http://schema.org/Person">
						<span itemProp="name">{this.props.painting.artist ? this.props.painting.artist : ''}</span>
					</div>
				</td>
				<td>
					<span itemProp="dateCreated">{this.props.painting.date ? this.props.painting.date : ''}</span>
				</td>
				<td>{this.props.painting.category ? this.props.painting.category : ''}</td>
				<td>{this.props.painting.inscription ? this.props.painting.inscription : ''}</td>
				<td>{this.props.painting.depicted_person ? this.props.painting.depicted_person : ''}</td>
				<td>
					<span itemProp="material">{this.props.painting.technique_material ? this.props.painting.technique_material : ''}</span>
				</td>
				<td>{this.props.painting.measurements ? this.props.painting.measurements : ''}</td>
				<td>
					<span itemProp="license">{this.props.painting.right_work ? this.props.painting.right_work : ''}</span>
				</td>
			</tr>
		)
	}
}

Painting.propTypes = {
	painting: PropTypes.object
};

export default Painting;