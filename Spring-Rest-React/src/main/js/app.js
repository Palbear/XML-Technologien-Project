'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

import { BrowserRouter as Router, Route, Link, IndexRoute, IndexLink, hashHistory } from 'react-router-dom';
import NavigationPanel from './NavBar/NavigationPanel.js';
import BasicRoute from './route/route.js';

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
		  <div className="App">
			  <NavigationPanel/>
			  <BasicRoute />
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
