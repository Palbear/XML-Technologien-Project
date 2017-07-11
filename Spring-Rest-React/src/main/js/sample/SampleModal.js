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
            info: '<a><b>hello</b><c>world</c></a>', 
            test: 'test'
        };
        this.close = this.close.bind(this)
        this.testXml = this.testXml.bind(this)
        this.queryAuthorBirthPlace = this.queryAuthorBirthPlace.bind(this)
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
    queryAuthorBirthPlace2() {
    	this.setState({
        	info: 'hello world', 
        	test: 'query 2 completed'
        });
    }
    
    // This method takes the name of the author and returns a birthPlace
    //TODO:
    // A parameter of the author name should replace "August_Strindberg" and all spaces in the name paramter should be replaced with underscores : .split(' ').join('_')
    queryAuthorBirthPlace(){
      let query = "prefix dbpedia: <http://dbpedia.org/resource/> prefix dbpedia-owl: <http://dbpedia.org/ontology/> select ?birthPlace where { dbpedia:August_Strindberg dbpedia-owl:abstract ?abstract ; dbpedia-owl:birthPlace ?birthPlace . filter(langMatches(lang(?abstract),'en'))}";
      dps.client()
          .query(query)
          .timeout(15000) // optional, defaults to 10000
          .asJson() // or asXml()
          .then(function(r) {
              console.log(r);
              console.log("Birth Place of Author  1 -> ", r.results.bindings[0].birthPlace.value);
              setStateTest();
          }).catch(function(e) { console.log(e) });

    }
    
    setStateTest() {
    	this.setState({
    		info: 'setting state?', 
    		test: 'setting test state?'
    	});
    }
    
    // Handles click on Test XML button
    testXml(query) {
    	const tmp = "<a><b>world</b><c>hello</c></a>";
    	this.setState({
    		info: tmp, 
    		test: 'test after test xml'
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
                            <img src={this.props.selectedUrl} width="250" height="225" />
                            <p> <strong>TITLE : </strong> <br /> <span itemProp="name">{this.state.painting.title}</span> </p>
                            <p> <strong>ARTIST : </strong>
                    			<br /> 
                    			<span itemProp="creator" itemScope itemType="http://schema.org/Person">
    								<span itemProp="name">{this.state.painting.artist}</span>
    							</span>
    						</p>
                            <p> <strong>DATE : </strong> <br /> <span itemProp="dateCreated">{this.state.painting.date}</span> </p>
                            <p> <strong>Test </strong> <br /> {this.state.test ? this.state.test.toString() : 'dumb test'} </p>  
                            <p> <strong>Query 1 :</strong> <br /> {this.state.info.toString()} </p>                           
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <button onClick={this.testXml}>XML test</button>
                        <button onClick={this.queryAuthorBirthPlace}>Birth Place of the Author</button>
                        <button onClick={this.close}>Close</button>                                           
                    </Modal.Footer>
                </Modal>
        );
    }
};


module.exports = SampleModal;