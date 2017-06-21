var Painting = React.createClass({

  getInitialState: function() {
    return {display: true };
  },
  showPainting() {
    var self = this;
    $.ajax({
        url: self.props.painting._links.self.href,
   //     type: 'DELETE',
        success: function(result) {
          self.setState({display: false});
        }
    //,
   //     error: function(xhr, ajaxOptions, thrownError) {
   //       toastr.error(xhr.responseJSON.message);
     //   }
    });
  },
  render: function() {

    if (this.state.display==false) return null;
    else return (
      <tr>
          <td>{this.props.painting.recordID}</td>
          <td>{this.props.painting.title}</td>
          <td>{this.props.painting.artist}</td>
          <td>
            <button className="btn btn-info" onClick={this._showPainting}>view</button>
          </td>
      </tr>
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
                  <th>recordID</th>
                  <th>title</th>
                  <th>artist</th>
                  <th>view</th>
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
