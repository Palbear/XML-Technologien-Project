const React = require('react');
const ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;

var ModalView = React.createClass({
	
	getInitialState: function() {
	    return { showModal: false };
	  },
	  
	close: function() {
	    this.setState({ showModal: false });
	  },

	 open: function() {
	    this.setState({ showModal: true });
	  },
	  
	 render: function() {
		  return (
			<div>
				<button onClick={this.open}>View</button>
				
				<Modal show={this.state.showModal} onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>{this.props.src.title}</Modal.Title>
					</Modal.Header>
					
					<Modal.Body>
						<div align="center">
							<img src={this.props.src.image_link} width="555" height="450" />
							<p> <strong>TITLE : </strong> <br /> {this.props.src.title} </p>
							<p> <strong>ARTIST : </strong> <br /> {this.props.src.artist} </p>
							<p> <strong>DATE : </strong> <br /> {this.props.src.date} </p>
							<p> <strong>CATEGORY : </strong> <br /> {this.props.src.category} </p>
							<p> <strong>INSCRIPTION :</strong> <br /> {this.props.src.inscription} </p>
						</div>
					</Modal.Body>
					
					<Modal.Footer>
						<button onClick={this.close}>close</button>
					</Modal.Footer>
				</Modal>
			</div>
		  );
	 }
});


module.exports = ModalView;