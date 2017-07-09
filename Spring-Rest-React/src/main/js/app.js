'use strict';

const React = require('react');
const ReactDOM = require('react-dom')
// const axios = require('axios');
const when = require('when');
const client = require('./client');
import {Button} from "react-bootstrap";
import {Image} from "react-bootstrap";
import ToggleImg from './ToggleImg';
import Lightbox from 'react-images';
import ModalView from './ModalView';
const Modal = require('react-modal');
const axios = require('axios');
const follow = require('./follow'); // function to hop multiple links by "rel"
const stompClient = require('./websocket-listener');
const root = '/api';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {paintings: [], attributes: [], page: 1, pageSize: 5, links: {}};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
		this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
	}

	loadFromServer(pageSize) {
		follow(client, root, [
				{rel: 'paintings', params: {size: pageSize}}]
		).then(paintingCollection => {
				return client({
					method: 'GET',
					path: paintingCollection.entity._links.profile.href,
					headers: {'Accept': 'application/schema+json'}
				}).then(schema => {
					this.schema = schema.entity;
					this.links = paintingCollection.entity._links;
					return paintingCollection;
				});
		}).then(paintingCollection => {
			this.page = paintingCollection.entity.page;
			return paintingCollection.entity._embedded.paintings.map(painting =>
					client({
						method: 'GET',
						path: painting._links.self.href
					})
			);
		}).then(paintingPromises => {
			return when.all(paintingPromises);
		}).done(paintings => {
			this.setState({
				page: this.page,
				paintings: paintings,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: this.links
			});
		});
	}

	onNavigate(navUri) {
		client({
			method: 'GET',
			path: navUri
		}).then(paintingCollection => {
			this.links = paintingCollection.entity._links;
			this.page = paintingCollection.entity.page;

			return paintingCollection.entity._embedded.paintings.map(painting =>
					client({
						method: 'GET',
						path: painting._links.self.href
					})
			);
		}).then(paintingPromises => {
			return when.all(paintingPromises);
		}).done(paintings => {
			this.setState({
				page: this.page,
				paintings: paintings,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				links: this.links
			});
		});
	}

	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}

	// tag::websocket-handlers[]
	refreshAndGoToLastPage(message) {
		follow(client, root, [{
			rel: 'paintings',
			params: {size: this.state.pageSize}
		}]).done(response => {
			if (response.entity._links.last !== undefined) {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		})
	}

	refreshCurrentPage(message) {
		follow(client, root, [{
			rel: 'paintings',
			params: {
				size: this.state.pageSize,
				page: this.state.page.number
			}
		}]).then(paintingCollection => {
			this.links = paintingCollection.entity._links;
			this.page = paintingCollection.entity.page;

			return paintingCollection.entity._embedded.paintings.map(painting => {
				return client({
					method: 'GET',
					path: painting._links.self.href
				})
			});
		}).then(paintingPromises => {
			return when.all(paintingPromises);
		}).then(paintings => {
			this.setState({
				page: this.page,
				paintings: paintings,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				links: this.links
			});
		});
	}
	// end::websocket-handlers[]

	// tag::register-handlers[]
	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
		stompClient.register([
			{route: '/topic/newPainting', callback: this.refreshAndGoToLastPage},
			{route: '/topic/updatePainting', callback: this.refreshCurrentPage},
			{route: '/topic/viewPainting', callback: this.refreshCurrentPage}
		]);
	}
	// end::register-handlers[]

	loadPaintingsFromServer(url) {
			let path = url ? url : "http://localhost:8080/api/paintings";
			let self = this;

			axios.get(path)
					.then(function(response) {
							self.setState({
									paintings: response.data._embedded.paintings
							});
							console.log(paintings);
					})
					.catch(function (error) {
							console.log(error);
					});
	 }

	 componentWillMount() {
 	         this.loadPaintingsFromServer();
 	     }
    setFilter(word) {
        if (word === 'All') {
            this.loadPaintingsFromServer();
        } else if (word === 'Allaert') {
            this.loadPaintingsFromServer('http://localhost:8080/api/paintings/search/findByArtistLike?name=Allaert%20van%20Everdingen');
        } else if (word === 'David') {
            this.loadPaintingsFromServer('http://localhost:8080/api/paintings/search/findByArtistLike?name=David%20Kl%C3%B6cker%20Ehrenstrahl');
        } else if (word === 'Nicolas') {
            this.loadPaintingsFromServer('http://localhost:8080/api/paintings/search/findByArtistLike?name=Nicolas%20Lancret');
        }
    }
	render() {
		return (
			<div>
				<PaintingList page={this.state.page}
							  paintings={loadPaintingsFromServer('http://localhost:8080/api/paintings')}
							  links={this.state.links}
							  pageSize={this.state.pageSize}
							  attributes={this.state.attributes}
							  onNavigate={this.onNavigate}
							  updatePageSize={this.updatePageSize}/>
			</div>
		)
	}
}



class PaintingList extends React.Component {

	constructor(props) {
		super(props);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleInput = this.handleInput.bind(this);
		// this.state = {
    //     paintings: [],
    //     url: "http://localhost:8080/api/paintings"
    // };
	}

	handleInput(e) {
		e.preventDefault();
		var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.props.updatePageSize(pageSize);
		} else {
			ReactDOM.findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
		}
	}

	handleNavFirst(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.first.href);
	}

	handleNavPrev(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.prev.href);
	}

	handleNavNext(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.next.href);
	}

	handleNavLast(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.last.href);
	}

	render() {
		var pageInfo = this.props.page.hasOwnProperty("number") ?
			<h3>paintings - Page {this.props.page.number + 1} of {this.props.page.totalPages}</h3> : null;
		// let rows = [];
    // this.state.paintings.forEach(function(painting) {
    //     rows.push(
    //         <Painting painting={painting} key={painting.recordID} />);
    // });
		var paintings = this.props.paintings.map(painting =>
			<Painting key={painting.entity._links.self.href}
					  painting={painting}
					  attributes={this.props.attributes}/>
		);

		var navLinks = [];
		if ("first" in this.props.links) {
			navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
		}
		if ("prev" in this.props.links) {
			navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
		}
		if ("next" in this.props.links) {
			navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
		}
		if ("last" in this.props.links) {
			navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
		}

		return (
			<div>
				{pageInfo}
				<input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
        {/* <Button onClick={() => this.setFilter('All')}>Home</Button>
        <Button onClick={() => this.setFilter('Allaert')}>Allaert</Button>
        <Button onClick={() => this.setFilter('David')}>David</Button>
        <Button onClick={() => this.setFilter('Nicolas')}>Nicolas</Button> */}
				<table>
					<tbody>
						<tr>
							<th>RecordID</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Category</th>
							<th>Date</th>
							<th>VIEW</th>
						</tr>
						{paintings}
					</tbody>
				</table>
				<div>
					{navLinks}
				</div>
			</div>
		)
	}
}

class Painting extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var self = this;


		return (
			<tr>
			 <td>{this.props.painting.entity.recordID}</td>
			 <td>{this.props.painting.entity.title}</td>
			 <td>{this.props.painting.entity.artist}</td>
			 <td>{this.props.painting.entity.category}</td>
			 <td>{this.props.painting.entity.date}</td>
			 <td>
				 		<ModalView src={this.props.painting} />
						{/* <Image src={`http://emp-web-22.zetcom.ch/eMuseumPlus?service=ImageAsset&module=collection&objectId=${this.props.painting.entity.recordID}`} onClick={this.popup}/> */}
			 </td>
			</tr>
		)
	}
}




ReactDOM.render(
	<App />,
	document.getElementById('react')

)
