var { Router, Route, IndexRoute, IndexLink, hashHistory, Link } = ReactRouter;

var SpaTest = React.createClass({
  render: function() {
    return (
      <div>
      	<aside>
      		<h2>Test : Painting by</h2>
      		<ul className="header">
      			<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
      			<li><Link to="/allaert" activeClassName="active">Allaert</Link></li>
      			<li><Link to="/david" activeClassName="active">David</Link></li>
      			<li><Link to="/nicolas" activeClassName="active">Nicolas</Link></li>
      		</ul>
      	</aside>
        <div className="content">
        	{this.props.children}
        </div>
      </div>
    )
  }
});

var Home = React.createClass({
	  render: function() {
	      return (
	        <div>
	          <h2>React-Router Test</h2>
	          <p> Single-Page App in React using React Router. </p>
	        </div>
	      );
	    }
	});

var Allaert = React.createClass({
	  render: function() {
	      return (
	        <div>
	          <h2>Nicolas</h2>
	          <App url="http://localhost:8080/api/paintings/search/findByArtistLike?name=Allaert%20van%20Everdingen" />
	        </div>
	      );
	    }
	});
	 
var David = React.createClass({
	  render: function() {
	      return (
	        <div>
	          <h2>David</h2>
	          <App url="http://localhost:8080/api/paintings/search/findByArtistLike?name=David%20Kl%C3%B6cker%20Ehrenstrahl" />
	        </div>
	      );
	    }
	});

var Nicolas = React.createClass({
	  render: function() {
	      return (
	        <div>
	          <h2>Nicolas</h2>
	          <App url="http://localhost:8080/api/paintings/search/findByArtistLike?name=Nicolas%20Lancret" />
	        </div>
	      );
	    }
	});


{/*  ------------- paintingList -----------------------------------------*/}


var Painting = React.createClass({
	render: function(){
		return(
			<tr>
				<td>{this.props.painting.recordID}</td>
				<td>{this.props.painting.title}</td>
				<td>{this.props.painting.artist}</td>
				<td>{this.props.painting.category}</td>
				<td>
				 	<ToggleImg imgurl={this.props.painting.image_link} />
				</td>
			</tr>
		  );
	}
});


var ToggleImg = React.createClass({
	
	getInitialState: function() {
	    return { showResults: false };
	  },
	  
	onClick: function() {
		this.setState({ showResults: !this.state.showResults });
	  },
	  
	 render: function() {
		  return (
			<div>
				<button className="btn btn-info" onClick={this.onClick}>view</button>
				<div className={'show-'+this.state.showResults}>
					<img src={this.props.imgurl} width="175" height="250" />
				</div>
			</div>
		  );
	 }
});


var PaintingTable = React.createClass({

  render: function() {

    var rows = [];
    this.props.paintings.forEach(function(painting) {
      rows.push(
        <Painting painting={painting} key={painting.recordID} />);
    });

    return (
      <table className="table table-striped">
          <thead>
              <tr>
              	<th>RecordID</th>
              	<th>Title</th>
              	<th>Artist</th>
              	<th>Category</th>
              	<th>View</th>
              </tr>
          </thead>
          <tbody>
          	{rows}
          </tbody>
      </table>
    );
  }
});

var App = React.createClass({

  loadPaintingsFromServer: function() {

    var self = this;
    var url= this.props.url;
    
    $.ajax({
        url: url
      }).then(function(data) {
        self.setState({paintings: data._embedded.paintings});
      });

  },

  getInitialState: function() {
    return {paintings: []};
  },

  componentDidMount: function() {
    this.loadPaintingsFromServer();
  },

  render() {
    return ( <PaintingTable paintings={this.state.paintings} />
    	);
  }
});

	
ReactDOM.render(
		<ReactRouter.Router history={ReactRouter.hashHistory}>
			<ReactRouter.Route path="/" component={SpaTest}>
				<IndexRoute component={Home} />
				<ReactRouter.Route path="allaert" component={Allaert} />
				<ReactRouter.Route path="david" component={David} />
				<ReactRouter.Route path="nicolas" component={Nicolas} />
			</ReactRouter.Route>
		</ReactRouter.Router>, 
		document.getElementById('root')
);



