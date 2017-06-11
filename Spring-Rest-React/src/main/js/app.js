'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom')
const client = require('./client');
// end::vars[]

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {paintings: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/paintings'}).done(response => {
			this.setState({paintings: response.entity._embedded.paintings});
		});
	}

	render() {
		return (
			<PaintingList paintings={this.state.paintings}/>
		)
	}
}
// end::app[]

// tag::painting-list[]
class PaintingList extends React.Component{
	render() {
		var paintings = this.props.paintings.map(painting =>
			<Painting key={painting._links.self.href} painting={painting}/>
		);
		return (
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
		)
	}
}
// end::painting-list[]

// tag::painting[]
class Painting extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.painting.title}</td>
				<td>{this.props.painting.artist}</td>
				<td>{this.props.painting.date}</td>
				<td>{this.props.painting.category}</td>
				<td>{this.props.painting.inscription}</td>
				<td>{this.props.painting.depicted_person}</td>
				<td>{this.props.painting.technique_material}</td>
				<td>{this.props.painting.measurements}</td>
				<td>{this.props.painting.right_work}</td>
			</tr>
		)
	}
}
// end::painting[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]
