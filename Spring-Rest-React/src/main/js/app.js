'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

import { BrowserRouter as Router, Route, Link, IndexRoute, IndexLink, hashHistory } from 'react-router-dom';
import NavigationPanel from './NavBar/NavigationPanel.js';
import PaintingTable from './paintingTable/PaintingTable.js';
import PaintingList from './paintingList/PaintingList.js';

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
		  <div className="App">
			  <NavigationPanel/>
			  <Route exact path="/" component={PaintingTable}/>
			  <Route path="/table" component={PaintingList}/>
			  <Route path="/paintings" component={PaintingList}/>
			  <Route path="/nicolas" component={PaintingList}/>
		  </div>
		)
	}
}

ReactDOM.render(
	<Router>
		<App/>
	</Router>,
	document.getElementById('react')
)
