const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const PropTypes = require('prop-types');
var Modal = ReactBootstrap.Modal;
let dps = require('dbpedia-sparql-client').default;
const {Client} = require('virtuoso-sparql-client');
let SparqlClient = new Client("https://libris.kb.se/sparql");

// This class takes care of the pop-up Painting window from the Paintings Gallery
class PaintingModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            paintings: [],
            painting: {},
            info: ''
        };
        this.close = this.close.bind(this)
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

    //This method returns the artistic movement of the artist (could be more than one movement)
    // A parameter of the author name should replace "Pablo Picasso" and all spaces in the name paramter should be replaced with underscores : .split(' ').join('_')
    movementQuery() {
        let query = 'SELECT DISTINCT ?movement WHERE { ?author rdfs:label ?name . FILTER regex(?name, "Pablo Picasso", "i") ?author dbo:movement ?movement }';

        dps.client()
            .query(query)
            .timeout(15000) // optional, defaults to 10000
            .asJson() // or asXml()
            .then(function(r) {
                console.log(r);
                console.log("Artistic Movement 1 -> ", r.results.bindings[0].movement.value);
                console.log("Artistic Movement 2 -> ", r.results.bindings[1].movement.value);
                this.setState({
                    info: r.results.bindings[0]
                });
            }).catch(function(e) { console.log(e) });
    }

    // This method extracts the Description about the Author and a Thumbnail of his photo
    // A parameter of the author name should replace "Ferdinand_von_Wright" and all spaces in the name paramter should be replaced with underscores : .split(' ').join('_')
    authorDescriptionAndThumbnailQuery(){

      let query = "prefix dbpedia: <http://dbpedia.org/resource/> prefix dbpedia-owl: <http://dbpedia.org/ontology/> select ?abstract ?thumbnail where { dbpedia:Ferdinand_von_Wright dbpedia-owl:abstract ?abstract ; dbpedia-owl:thumbnail ?thumbnail . filter(langMatches(lang(?abstract),'en'))}";

      dps.client()
          .query(query)
          .timeout(15000) // optional, defaults to 10000
          .asJson() // or asXml()
          .then(function(r) {
              console.log(r);
              console.log("Abstact -> ", r.results.bindings[0].abstract.value);
              console.log("Thumbnail -> ", r.results.bindings[0].thumbnail.value);
              //.results.bindings["0"].abstract.value
              this.setState({
                  info: r.results.bindings[0]
              });
          }).catch(function(e) { console.log(e) });

    }

    // This method takes the name of the author and returns a birthPlace
    //TODO:
    // A parameter of the author name should replace "August_Strindberg" and all spaces in the name paramter should be replaced with underscores : .split(' ').join('_')
    authorBirthPlace(){
      let query = "prefix dbpedia: <http://dbpedia.org/resource/> prefix dbpedia-owl: <http://dbpedia.org/ontology/> select ?birthPlace where { dbpedia:August_Strindberg dbpedia-owl:abstract ?abstract ; dbpedia-owl:birthPlace ?birthPlace . filter(langMatches(lang(?abstract),'en'))}";
      dps.client()
          .query(query)
          .timeout(15000) // optional, defaults to 10000
          .asJson() // or asXml()
          .then(function(r) {
              console.log(r);
              console.log("Birth Place of Author  1 -> ", r.results.bindings[0].birthPlace.value);
              this.setState({
                  info: r.results.bindings[0]
              });
          }).catch(function(e) { console.log(e) });

    }

    // This method takes the name of the author and returns a 10 other known poeple who were born in the same place
    //TODO:
    // A parameter of the author name should replace "Ferdinand_von_Wright" and all spaces in the name paramter should be replaced with underscores : .split(' ').join('_')
    otherTenPeopleBornInSamePlace(){

      let query = "PREFIX db: <http://dbpedia.org/resource/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX dbo: <http://dbpedia.org/ontology/> prefix dbpedia: <http://dbpedia.org/resource/> prefix dbpedia-owl: <http://dbpedia.org/ontology/> SELECT DISTINCT ?otherName WHERE { dbpedia:Ferdinand_von_Wright dbpedia-owl:birthPlace ?birthPlace . ?person dbo:birthPlace ?birthPlace . ?person dbo:birthDate ?birth . ?person foaf:name ?otherName .} LIMIT 10";
      dps.client()
          .query(query)
          .timeout(15000) // optional, defaults to 10000
          .asJson() // or asXml()
          .then(function(r) {
              console.log(r);
              console.log("Other People born in the same place -> ", r.results.bindings[0].otherName.value);
              console.log("Other People born in the same place -> ", r.results.bindings[2].otherName.value);
              console.log("Other People born in the same place -> ", r.results.bindings[3].otherName.value);
              console.log("Other People born in the same place -> ", r.results.bindings[4].otherName.value);
              console.log("Other People born in the same place -> ", r.results.bindings[5].otherName.value);
              console.log("Other People born in the same place -> ", r.results.bindings[6].otherName.value);
              console.log("Other People born in the same place -> ", r.results.bindings[7].otherName.value);
              console.log("Other People born in the same place -> ", r.results.bindings[8].otherName.value);
              console.log("Other People born in the same place -> ", r.results.bindings[9].otherName.value);
              this.setState({
                  info: r.results.bindings[0]
              });
          }).catch(function(e) { console.log(e) });
    }


    /*
    If depicted person exists, this method returns the birth place of the depicted person
    This method is not optimized and it could last longer than other methods
    The reason is that there is a regex that is looking for people that have the same name that we have in the database, and here is the problem:
    The name in DBpedia doesn't always match or contain the name that we have
    For Example:
    The name (Magdalena Sibylla) works  as the name in DBpedia is (Sophia Magdalena of Denmark)
    But this name (Drottning Sofia Magdalena) doesn't work as it is different in DBpedia (Sophia Magdalena of Denmark)
    The name (Prinsessan Sofia Albertina) also doesn't work as in DBpedia it is (Sophia Albertina, Abbess of Quedlinburg)
    */
    birthPlaceOfDepictedPerson(){
      let query = 'SELECT ?name ?birthPlace WHERE { ?author rdfs:label ?name . FILTER regex(?name, "Magdalena Sibylla", "i") ?author dbo:birthPlace ?birthPlace }';
      dps.client()
          .query(query)
          .timeout(15000) // optional, defaults to 10000
          .asJson() // or asXml()
          .then(function(r) {
              console.log(r);
              console.log("Birth place of the depicted person -> ", r.results.bindings["0"].birthPlace.value)
              this.setState({
                  info: r.results.bindings[0]
              });
          }).catch(function(e) { console.log(e) });
    }

    // This method takes the date of the painting and returns 10 other known artists who were born in Berlin
    //TODO:
    // A parameter of the date should be replaced by the date variable of the painting
    tenArtistsBornBeforeTheDateOfThePainting(){
      let query = "PREFIX db: <http://dbpedia.org/resource/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX dbo: <http://dbpedia.org/ontology/> SELECT ?name ?person WHERE { ?person dbo:birthPlace db:Berlin . ?person dbo:birthDate ?birth . ?person foaf:name ?name . FILTER (?birth < '1900'^^xsd:date) . } LIMIT 10";
      dps.client()
          .query(query)
          .timeout(15000) // optional, defaults to 10000
          .asJson() // or asXml()
          .then(function(r) {
              console.log(r);
              console.log("Other People born in the same place -> ", r.results.bindings[0].person.value);
              console.log("Other People born in the same place -> ", r.results.bindings[2].person.value);
              console.log("Other People born in the same place -> ", r.results.bindings[3].person.value);
              console.log("Other People born in the same place -> ", r.results.bindings[4].person.value);
              console.log("Other People born in the same place -> ", r.results.bindings[5].person.value);
              console.log("Other People born in the same place -> ", r.results.bindings[6].person.value);
              console.log("Other People born in the same place -> ", r.results.bindings[7].person.value);
              console.log("Other People born in the same place -> ", r.results.bindings[8].person.value);
              console.log("Other People born in the same place -> ", r.results.bindings[9].person.value);
              this.setState({
                  info: r.results.bindings[0]
              });
          }).catch(function(e) { console.log(e) });
    }

    // CORS problem!
    sparqlQueryNationalLibrary(){
      SparqlClient.query('PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX dbpedia: <http://dbpedia.org/ontology/> PREFIX rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> select distinct ?subject ?predicate ?object {   ?subject a foaf:Person .   ?subject foaf:name "David Klöcker Ehrenstrahl" .   ?subject ?predicate ?object .  filter( regex(str(?object), "dbpedia" ))}')
        .then((results)=>{
          console.log(results);
        })
        .catch(console.log);
    }
    render() {

    	var url =
			"http://collection.nationalmuseum.se/eMuseumPlus?service=ExternalInterface&module=collection&objectId=" +
			this.state.painting.recordID +
			"&viewType=detailView";
    	var urlTitle = "Nationalmuseum Sweden page: Record " + this.state.painting.recordID;

        return (
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.painting.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div align="center" itemScope itemType="http://schema.org/Painting">
                            	<img src={this.props.selectedUrl} width="555" height="450" />
                            	<p> <strong>TITLE : </strong> <br /> <span itemProp="name">{this.state.painting.title}</span> </p>
                            	<p> <strong>ARTIST : </strong>
                            		<br />
                            		<div itemProp="creator" itemScope itemType="http://schema.org/Person">
            							<span itemProp="name">{this.state.painting.artist}</span>
            						</div>
                            	</p>
                            	<p> <strong>DATE : </strong> <br /> {this.state.painting.date} </p>
                            	<p> <strong>INSCRIPTION :</strong> <br /> {this.state.painting.inscription} </p>
                            	<p> <strong>MATERIAL : </strong> <br /> {this.state.painting.technique_material} </p>
                            	<p> <strong>Depicted Person :</strong> <br /> {this.state.painting.depicted_person} </p>
                            	<p> <strong>Link :</strong> <br /> <a itemProp="url" href={url} className="button">{urlTitle}</a> </p>
                            	<p> <strong>Query 1 :</strong> <br /> {this.state.info.toString()} </p>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>

                        <button onClick={this.authorDescriptionAndThumbnailQuery}>Author's Description and Photo</button>
                        <button onClick={this.movementQuery}>Artistic Movement</button>
                        <button onClick={this.authorBirthPlace}>Author's Birth Place</button>
                        <button onClick={this.otherTenPeopleBornInSamePlace}>Other 10 people born in the same Place</button>
                        <button onClick={this.birthPlaceOfDepictedPerson}>Birth Place of the depicted person</button>
                        <button onClick={this.tenArtistsBornBeforeTheDateOfThePainting}>Ten Artists born in Berlin before the date of the painting</button>

                        <button onClick={this.close}>close</button>
                    </Modal.Footer>
                </Modal>
        );
    }
};


module.exports = PaintingModal;
