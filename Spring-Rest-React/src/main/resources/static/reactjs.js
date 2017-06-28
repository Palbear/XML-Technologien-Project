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


{/* ------------------- filter -------------------------*/}

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
	      	<p>
	      		<br/>
	      	</p>
	        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
	          <option value="select">Select</option>
	          <option value="schweden">Schweden</option>
	          <option value="deutschland">Deutschland</option>
	        </select>
	      </div>
	    )
	  }
}

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
	      	<p>
	      		<br/>
	      	</p>
	        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
	          <option value="select">Select</option>
	          <option value="gemaelde">Gemälde</option>
	          <option value="Keramik">Keramik</option>
	          <option value="portrait">Portrait</option>
	        </select>
	      </div>
	    )
	  }
}

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
	      	<p>
	      		<br/>
	      	</p>
	        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
	        	<option value="select">Select</option>
	        	<option value="a-f">A-F</option>
	        	<option value="h-m">H-M</option>
	        	<option value="n-t">N-T</option>
	        	<option value="u-z">U-Z</option>
	        </select>
	      </div>
	    )
	  }
}

class SelectTest extends React.Component {
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
	      	<p>
	      		<br/>
	      	</p>
	        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
	          <option value="select">Select</option>
	          <option value="allaert">Allaert</option>
	          <option value="david">Daiv</option>
	          <option value="Niclas">Niclas</option>
	        </select>
	      </div>
	    )
	  }
}


ReactDOM.render(<SelectCountry />, document.getElementById('selectCountry') );
ReactDOM.render(<SelectCategory />, document.getElementById('selectCategory') );
ReactDOM.render(<SelectArtist />, document.getElementById('selectArtist') );
ReactDOM.render(<SelectTest />, document.getElementById('selectTest') );
