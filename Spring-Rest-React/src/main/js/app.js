'use strict';

const React = require('react');
const ReactDOM = require('react-dom')
const when = require('when');
const client = require('./client');

const follow = require('./follow'); // function to hop multiple links by "rel"

const stompClient = require('./websocket-listener');

const root = '/api';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {paintings: [], attributes: [], page: 1, pageSize: 5, links: {}};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onView = this.onView.bind(this);
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

	// tag::on-create[]
	onCreate(newPainting) {
		follow(client, root, ['paintings']).done(response => {
			client({
				method: 'POST',
				path: response.entity._links.self.href,
				entity: newPainting,
				headers: {'Content-Type': 'application/json'}
			})
		})
	}
	// end::on-create[]

	onUpdate(painting, updatedPainting) {
		client({
			method: 'PUT',
			path: painting.entity._links.self.href,
			entity: updatedPainting,
			headers: {
				'Content-Type': 'application/json',
				'If-Match': painting.headers.Etag
			}
		}).done(response => {
			/* Let the websocket handler update the state */
		}, response => {
			if (response.status.code === 412) {
				alert('DENIED: Unable to update ' + painting.entity._links.self.href + '. Your copy is stale.');
			}
		});
	}

	onView(painting) {
		client({method: 'DELETE', path: painting.entity._links.self.href});
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

	render() {
		return (
			<div>
				<PaintingList page={this.state.page}
							  paintings={this.state.paintings}
							  links={this.state.links}
							  pageSize={this.state.pageSize}
							  attributes={this.state.attributes}
							  onNavigate={this.onNavigate}
							  onUpdate={this.onUpdate}
							  onView={this.onView}
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

		var paintings = this.props.paintings.map(painting =>
			<Painting key={painting.entity._links.self.href}
					  painting={painting}
					  attributes={this.props.attributes}
					  onUpdate={this.props.onUpdate}
					  onView={this.props.onView}/>
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
				<table>
					<tbody>
						<tr>
							<th>recordID</th>
							<th>title</th>
							<th>artist</th>
							<th>date</th>
							<th>category</th>
							<th>inscription</th>
							<th>depicted_person</th>
							<th>technique_material</th>
							<th>measurements</th>
							<th>right_work</th>
							<th>image_link</th>
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
		this.handleView = this.handleView.bind(this);
	}

	handleView() {
		this.props.onView(this.props.painting);
	}

	render() {
		return (
			<tr>
				<td>{this.props.painting.entity.recordID}</td>
				<td>{this.props.painting.entity.title}</td>
				<td>{this.props.painting.entity.artist}</td>
				<td>{this.props.painting.entity.date}</td>
				<td>{this.props.painting.entity.category}</td>
				<td>{this.props.painting.entity.inscription}</td>
				<td>{this.props.painting.entity.depicted_person}</td>
				<td>{this.props.painting.entity.technique_material}</td>
				<td>{this.props.painting.entity.measurements}</td>
				<td>{this.props.painting.entity.right_work}</td>
				<td><div class="parent"><img src={this.props.painting.entity.image_link}/></div></td>
			</tr>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
