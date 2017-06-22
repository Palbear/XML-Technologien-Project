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

ReactDOM.render(<SelectTest />, document.getElementById('selectTest') );
