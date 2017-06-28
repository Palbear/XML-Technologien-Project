
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
    $.ajax({
        url: "http://localhost:8080/api/paintings/search/findByArtistLike?name=David%20Kl%C3%B6cker%20Ehrenstrahl"
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

ReactDOM.render(<App />, document.getElementById('root') );