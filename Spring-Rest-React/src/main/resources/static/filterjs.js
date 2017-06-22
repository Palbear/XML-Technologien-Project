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
