const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const PropTypes = require('prop-types');
var Modal = ReactBootstrap.Modal;
let dps = require('dbpedia-sparql-client').default;

class SampleModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            paintings: [],
            painting: {},
            info: '<painting><title>hello</title><author></author></painting>', 
            test: 'test'
        };
        this.close = this.close.bind(this)
        this.testXml = this.testXml.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.showModal !== this.state.showModal) {
            this.setState({
                showModal: nextProps.showModal
            });
        }
        if (nextProps.selectedUrl !== this.state.selectedUrl) {
            let painting = this.findPainting(nextProps.paintings, nextProps.selectedUrl);
            this.setState({
                paintings: nextProps.paintings,
                painting: painting[0]
            });
        }
    }
    findPainting(paintings, selectedUrl) {
        return paintings.filter((painting) => painting.image_link === selectedUrl)
    }
    close() {
        this.setState({
            showModal: false
        });
    }
    
    // Handles click on Test XML button
    testXml() {
    	let tmp = "<painting><title>" + this.state.painting.title + //{this.state.painting.title} + 
    				"</title><author>" + this.state.painting.artist + 
    				"</author></painting>";
    	this.setState({
    		info: tmp, 
    		test: 'setting test state?'
    	});
    }

    render() {
        return (
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.painting.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="modal-dialog" itemScope itemType="http://schema.org/Painting">
                            <img src={this.props.selectedUrl} height="225" />
                              
                                    <div className="painting-modal-infos-container">
                                      
                                      <div className="painting-info-entry">
                                      	<strong>TITLE</strong> <br />
                                      	<span itemProp="name">{this.state.painting.title}</span>
                                      </div>
                                      
                                      <div className="painting-info-entry">
                                      	<strong>ARTIST</strong><br />
                                      	<span itemProp="creator" itemScope itemType="http://schema.org/Person">
                  							<span itemProp="name">{this.state.painting.artist}</span>
                  						</span>
                                      </div>
                                      
                                      <div className="painting-info-entry">
                                      	<strong>CREATION DATE</strong> <br />
                                      	<span itemProp="dateCreated">{this.state.painting.date}</span>
                                      </div>
                                      
                                 </div>

                            <p> <strong>Test </strong> <br /> {this.state.test ? this.state.test.toString() : 'dumb test'} </p>  
                            <p> <strong>XML Template :</strong> <br /> {this.state.info.toString()} </p>                           
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <button onClick={this.testXml}>Fill XML</button>
                        <button onClick={this.close}>Close</button>                                           
                    </Modal.Footer>
                </Modal>
        );
    }
};


module.exports = SampleModal;