import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import './BCrumbs.css';
import { BreadcrumbList, ListItem, RDFaBreadcrumbList, RDFaListItem, MicrodataBreadcrumbList, MicrodataListItem } from 'react-semantic-breadcrumbs'

const breadcrumbsPaintings = (
		  <BreadcrumbList format="RDFa" separator=" > ">
		    <ListItem url="/">Home</ListItem>
		    <ListItem url="/paintings">Paintings</ListItem>
		    <ListItem url="/paintings/mona-lisa">Mona Lisa</ListItem>
		  </BreadcrumbList>
		)
		
const breadcrumbsArtists = (
		  <BreadcrumbList format="RDFa" separator=" > ">
		    <ListItem url="/">Home</ListItem>
		    <ListItem url="/artists">Artists</ListItem>
		    <ListItem url="/artists/leonardo-da-vinci">Leonardo da Vinci</ListItem>
		  </BreadcrumbList>
		);

class BCrumbs extends Component {
	
	constructor(props) {
		  super(props);
		  this.state = { greeting: 'Hello' };
		  this.swedify = this.swedify.bind(this);
		}
	
	swedify() {
		this.setState({ greeting: 'Hej' });
	}
	
	render() {
		return (
			<div className="BCrumbs">
			    
				{this.state.greeting} {this.props.name}, says the BCrumbs Component!
				<br/>
			    <button onClick={this.swedify}>Swedify!</button>
			    <br />
			    <p>Breadcrumbs Paintings</p>
			    {breadcrumbsPaintings}
			    <p>Breadcrumbs Artists</p>
			    {breadcrumbsArtists}
			</div>
		);
	}
}

export default BCrumbs;