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
		  <div className="App">
		  	<h3>Paintings</h3>
			<PaintingList paintings={this.state.paintings}/>
			<Filter />
          </div>
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
				<td>{this.props.paintings.measurements}</td>
				<td>{this.props.painting.right_work}</td>
			</tr>
		)
	}
}
// end::painting[]

// tag::filter[]
class Filter extends React.Component{
	render() {
		return (
			<div>
				<h3>Filter (only templates)</h3>
				<SelectCountry />
				<SelectCategory />
				<SelectArtist />
			</div>
		)
	}
}
// end::filter[]

// tag::selectCountry[]
class SelectCountry extends React.Component {
	  constructor(props) {
	    super(props);
	    
	    this.state = { value: 'select'};
	  }
	  onChange(e) {
	    this.setState({
	      value: e.target.value
	    })
	  }
	  render() {
	    return (
	      <div className="form-group">
	        <label htmlFor="selectCountry">Country</label>
	        <br />
	        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
	          <option value="select">Select an option</option>
	          <option value="sweden">Schweden</option>
	          <option value="germany">Deutschland</option>
	        </select>
	      </div>
	    )
	  }
}
// end::selectCountry[]

//tag::selectCategory[]
class SelectCategory extends React.Component {
	  constructor(props) {
	    super(props);
	    
	    this.state = { value: 'select'};
	  }
	  onChange(e) {
	    this.setState({
	      value: e.target.value
	    })
	  }
	  render() {
	    return (
	      <div className="form-group">
	        <label htmlFor="selectCategory">Category</label>
	        <br />
	        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
	          <option value="select">Select an option</option>
	          <option value="painting">Gemälde</option>
	          <option value="ceramics">Keramik</option>
	          <option value="portrait">Portrait</option>
	        </select>
	      </div>
	    )
	  }
}
//end::selectCategory[]

//tag::selectArtist[]
class SelectArtist extends React.Component {
	  constructor(props) {
	    super(props);
	    
	    this.state = { value: 'select'};
	  }
	  onChange(e) {
	    this.setState({
	      value: e.target.value
	    })
	  }
	  render() {
	    return (
	      <div className="form-group">
	        <label htmlFor="selectArtist">Artist</label>
	        <br />
	        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
	          <option value="select">Select an option</option>
	          <option value="a-f">A-F</option>
	          <option value="h-m">H-M</option>
	          <option value="n-t">N-T</option>
	          <option value="u-z">U-Z</option>
	        </select>
	      </div>
	    )
	  }
}
//end::selectArtist[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]
