const React = require('react');

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

module.exports = ToggleImg;
