const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const PropTypes = require('prop-types');
const Modal = ReactBootstrap.Modal;
let dps = require('dbpedia-sparql-client').default;
import {Button} from "react-bootstrap";

// This class takes care of the pop-up Painting window from the Paintings Gallery
class PaintingModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            paintings: [],
            painting: {},
            info: 'default info',
            movement: [],
            otherArtistsFromSameMovement: [],
            authorDescriptionAndThumbnail: [],
            authorBirthPlace: [],
            otherPeoplesBornInSamePlace: [],
            birthPlacesOfDepictedPerson: [],
            artistsBornBeforeTheDateOfThePainting: [],

        };
        this.close = this.close.bind(this);
        this.movementQuery = this.movementQuery.bind(this);
        this.tenOtherArtistsFromSameMovement = this.tenOtherArtistsFromSameMovement.bind(this);
        this.authorDescriptionAndThumbnailQuery = this.authorDescriptionAndThumbnailQuery.bind(this);
        this.authorBirthPlace = this.authorBirthPlace.bind(this);
        this.otherTenPeopleBornInSamePlace = this.otherTenPeopleBornInSamePlace.bind(this);
        this.birthPlaceOfDepictedPerson = this.birthPlaceOfDepictedPerson.bind(this);
        this.tenArtistsBornBeforeTheDateOfThePainting = this.tenArtistsBornBeforeTheDateOfThePainting.bind(this);

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
            this.movementQuery(painting[0].artist);
            this.tenOtherArtistsFromSameMovement(painting[0].artist);
            this.authorDescriptionAndThumbnailQuery(painting[0].artist);
            this.authorBirthPlace(painting[0].artist);
            this.otherTenPeopleBornInSamePlace(painting[0].artist);
            this.birthPlaceOfDepictedPerson(painting[0].artist);
            this.tenArtistsBornBeforeTheDateOfThePainting(painting[0].date);
        }
    }

    findPainting(paintings, selectedUrl) {
        return paintings.filter((painting) => painting.smallImage === selectedUrl)
    }

    close() {
        this.setState({
            movement: [],
            otherArtistsFromSameMovement: [],
            authorDescriptionAndThumbnail: [],
            authorBirthPlace: [],
            otherPeoplesBornInSamePlace: [],
            birthPlacesOfDepictedPerson: [],
            artistsBornBeforeTheDateOfThePainting: [],
            showModal: false
        });
    }

    //This method returns the artistic movement of the artist (could be more than one movement)
    // A parameter of the author name should replace "Pablo Picasso" and all spaces in the name paramter should be replaced with underscores : .split(' ').join('_')
    movementQuery(author) {
        //let query = 'SELECT DISTINCT ?mov WHERE { ?author rdfs:label ?name . FILTER regex(?name, "Pablo Picasso", "i") ?author dbo:movement ?movement . ?movement rdfs:label ?mov . FILTER (LANG(?mov) = "en")}';
        let query = 'SELECT DISTINCT ?mov WHERE { ?author rdfs:label ?name . FILTER regex(?name,"' + author + ', "i") ?author dbo:movement ?movement . ?movement rdfs:label ?mov . FILTER (LANG(?mov) = "en")}';
        let self = this;
        dps.client()
            .query(query)
            .timeout(15000) // optional, defaults to 10000
            .asJson() // or asXml()
            .then(function (r) {
                console.log(r);
                self.setState({
                    movement: r.results.bindings
                });
            }).catch(function (e) {
            console.log(e)
        });
    }

    //This method retrieves ten other artists from the same movement mit
    // A parameter of the author name should replace "Pablo Picasso" and all spaces in the name paramter should be replaced with underscores : .split(' ').join('_')
    tenOtherArtistsFromSameMovement(author) {
        //let query = 'PREFIX db: <http://dbpedia.org/resource/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX dbo: <http://dbpedia.org/ontology/> SELECT ?otherArtist WHERE { ?author rdfs:label ?name . FILTER regex(?name, "Pablo Picasso", "i") FILTER (LANG(?name) = "en") ?author dbo:movement ?movement . ?person dbo:movement ?movement . ?person rdfs:label ?otherArtist . FILTER (LANG(?otherArtist) = "en")} LIMIT 10';
        let query = 'PREFIX db: <http://dbpedia.org/resource/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX dbo: <http://dbpedia.org/ontology/> SELECT ?otherArtist WHERE { ?author rdfs:label ?name . FILTER regex(?name, "' + author + '", "i") FILTER (LANG(?name) = "en") ?author dbo:movement ?movement . ?person dbo:movement ?movement . ?person rdfs:label ?otherArtist . FILTER (LANG(?otherArtist) = "en")} LIMIT 10';
        let self = this;
        dps.client()
            .query(query)
            .timeout(15000) // optional, defaults to 10000
            .asJson() // or asXml()
            .then(function (r) {
                console.log(r);
                self.setState({
                    otherArtistsFromSameMovement: r.results.bindings
                });
            }).catch(function (e) {
            console.log(e)
        });
    }

    // This method extracts the Description about the Author and a Thumbnail of his photo
    // A parameter of the author name should replace "Ferdinand_von_Wright" and all spaces in the name paramter should be replaced with underscores : .split(' ').join('_')
    authorDescriptionAndThumbnailQuery(author) {

        let query = "prefix dbpedia: <http://dbpedia.org/resource/> prefix dbpedia-owl: <http://dbpedia.org/ontology/> select ?abstract ?thumbnail where { dbpedia:" + author.split(' ').join('_') + " dbpedia-owl:abstract ?abstract ; dbpedia-owl:thumbnail ?thumbnail . filter(langMatches(lang(?abstract),'en'))}";
        let self = this;
        dps.client()
            .query(query)
            .timeout(15000) // optional, defaults to 10000
            .asJson() // or asXml()
            .then(function (r) {
                console.log(r);
                console.log("Abstact -> ", r.results.bindings[0].abstract.value);
                console.log("Thumbnail -> ", r.results.bindings[0].thumbnail.value);
                //.results.bindings["0"].abstract.value
                self.setState({
                    authorDescriptionAndThumbnail: r.results.bindings
                });
            }).catch(function (e) {
            console.log(e)
        });

    }

    // This method takes the name of the author and returns a birthPlace
    //TODO:
    // A parameter of the author name should replace "August_Strindberg" and all spaces in the name paramter should be replaced with underscores : .split(' ').join('_')
    authorBirthPlace(author) {
        let query = "prefix dbpedia: <http://dbpedia.org/resource/> prefix dbpedia-owl: <http://dbpedia.org/ontology/> select ?birthPlace ?place where { dbpedia:" + author.split(' ').join('_') + " dbpedia-owl:abstract ?abstract ; dbpedia-owl:birthPlace ?birthPlace . filter(langMatches(lang(?abstract),'en')) ?birthPlace rdfs:label ?place . filter(langMatches(lang(?place),'en')) }";
        let self = this;
        dps.client()
            .query(query)
            .timeout(15000) // optional, defaults to 10000
            .asJson() // or asXml()
            .then(function (r) {
                console.log(r);
                self.setState({
                    authorBirthPlace: r.results.bindings
                });
            }).catch(function (e) {
            console.log(e)
        });

    }

    // This method takes the name of the author and returns a 10 other known poeple who were born in the same place
    //TODO:
    // A parameter of the author name should replace "Ferdinand_von_Wright" and all spaces in the name paramter should be replaced with underscores : .split(' ').join('_')
    otherTenPeopleBornInSamePlace(author) {

        let query = "PREFIX db: <http://dbpedia.org/resource/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX dbo: <http://dbpedia.org/ontology/> prefix dbpedia: <http://dbpedia.org/resource/> prefix dbpedia-owl: <http://dbpedia.org/ontology/> SELECT DISTINCT ?otherName WHERE { dbpedia:" + author.split(' ').join('_') + " dbpedia-owl:birthPlace ?birthPlace . ?person dbo:birthPlace ?birthPlace . ?person dbo:birthDate ?birth . ?person foaf:name ?otherName .} LIMIT 10";
        let self = this;
        dps.client()
            .query(query)
            .timeout(15000) // optional, defaults to 10000
            .asJson() // or asXml()
            .then(function (r) {
                console.log(r);
                self.setState({
                    otherPeoplesBornInSamePlace: r.results.bindings
                });
            }).catch(function (e) {
            console.log(e)
        });
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
     If it may makes trouble we can drop this feature!
     */
    birthPlaceOfDepictedPerson(author) {
        let query = 'PREFIX db: <http://dbpedia.org/resource/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX dbo: <http://dbpedia.org/ontology/> SELECT ?name ?place WHERE { ?author rdfs:label ?name . FILTER regex(?name, "' + author + '", "i") ?author dbo:birthPlace ?birthPlace . ?birthPlace rdfs:label ?place . filter(langMatches(lang(?place),"en"))}';
        let self = this;
        dps.client()
            .query(query)
            .timeout(15000) // optional, defaults to 10000
            .asJson() // or asXml()
            .then(function (r) {
                console.log(r);
                console.log("Birth place of the depicted person -> ", r.results.bindings["0"].place.value);
                self.setState({
                    birthPlacesOfDepictedPerson: r.results.bindings
                });
            }).catch(function (e) {
            console.log(e)
        });
    }

    // This method takes the date of the painting and returns 10 other known artists who were born in Berlin
    //TODO:
    // A parameter of the date should be replaced by the date variable of the painting
    tenArtistsBornBeforeTheDateOfThePainting(date) {
        let query = "PREFIX db: <http://dbpedia.org/resource/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX dbo: <http://dbpedia.org/ontology/> SELECT ?name ?person WHERE { ?person dbo:birthPlace db:Berlin . ?person dbo:birthDate ?birth . ?person foaf:name ?name . FILTER (?birth < '" + date +"'^^xsd:date) . } LIMIT 10";
        let self = this;
        dps.client()
            .query(query)
            .timeout(15000) // optional, defaults to 10000
            .asJson() // or asXml()
            .then(function (r) {
                console.log(r);
                self.setState({
                    artistsBornBeforeTheDateOfThePainting: r.results.bindings
                });
            }).catch(function (e) {
            console.log(e)
        });
    }

    render() {

        var url =
            "http://collection.nationalmuseum.se/eMuseumPlus?service=ExternalInterface&module=collection&objectId=" +
            this.state.painting.recordID +
            "&viewType=detailView";
        var urlTitle = "Nationalmuseum Sweden page: Record " + this.state.painting.recordID;

        const movements = this.state.movement ? this.state.movement.map((item) =>
            <li>
                {item.mov.value}
            </li>
        ) : '';
        const otherArtistsFromSameMovement = this.state.otherArtistsFromSameMovement ? this.state.otherArtistsFromSameMovement.map((item) =>
            <li>
                {item.otherArtist.value}
            </li>
        ) : '';
        const authorDescriptionAndThumbnail = this.state.authorDescriptionAndThumbnail ? this.state.authorDescriptionAndThumbnail.map((item) =>
            <li>
                {item.abstract.value}
                <br/>
                <img src={item.thumbnail.value}/>
            </li>
        ) : '';
        const authorBirthPlace = this.state.authorBirthPlace ? this.state.authorBirthPlace.map((item) =>
            <li>
                {item.place.value}
            </li>
        ) : '';
        const otherPeoplesBornInSamePlace = this.state.otherPeoplesBornInSamePlace ? this.state.otherPeoplesBornInSamePlace.map((item) =>
            <li>
                {item.otherName.value}
            </li>
        ) : '';
        const birthPlacesOfDepictedPerson = this.state.birthPlacesOfDepictedPerson ? this.state.birthPlacesOfDepictedPerson.map((item) =>
            <li>
                {item.place.value}
            </li>
        ) : '';
        const artistsBornBeforeTheDateOfThePainting = this.state.artistsBornBeforeTheDateOfThePainting ? this.state.artistsBornBeforeTheDateOfThePainting.map((item) =>
            <li>
                {item.name.value}
            </li>
        ) : '';
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.painting.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                	<div className="modal-dialog" itemScope itemType="http://schema.org/Painting">
                    
                    
                    <img src={this.state.painting.image_link} width="555" height="450"/>
                    
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
                    
                    <div className="painting-info-entry">
                    	<strong>INSCRIPTION :</strong> <br />
                    	{this.state.painting.inscription}
                    </div>
                    
                    <div className="painting-info-entry">
                    	<strong>MATERIAL : </strong> <br />
                    	<span itemProp="material">{this.state.painting.technique_material}</span>
                    </div>
                    
                    <div className="painting-info-entry">
                    	<strong>Depicted Person :</strong> <br />
                    	{this.state.painting.depicted_person}
                    </div>
                    
                    <div className="painting-info-entry">
                    	<strong>Link :</strong> <br />
                    	<a itemProp="url" href={url} className="button">{urlTitle}</a>
                    </div>                   
                    
                  </div>
                    
                  <div className="painting-modal-infos-container painting-info-entry">
                    	
                    <div>
                	{this.state.authorDescriptionAndThumbnail.length > 0 ?
                            <div><strong>Author - Description and Thumbnail</strong> <br /><ul>{authorDescriptionAndThumbnail}</ul></div>
                             : ''}
                	</div>
                	
                	<div>
                		{this.state.authorBirthPlace.length > 0 ?
                            <div><strong>The author birth place</strong> <br /><ul>{authorBirthPlace}</ul></div> 
                             : '' }               	
                	</div>
                	
                	<div>
                		{this.state.otherPeoplesBornInSamePlace.length > 0 ?
                            <div><strong>10 other known people born in the same place :</strong> <br /><ul>{otherPeoplesBornInSamePlace}</ul></div> : '' }
                	</div>
                    
                	<div>
                		{this.state.movement.length > 0 ?
                            <div><strong>The artistic movement of the artist</strong> <br />
                                <ul>{movements}</ul>
                            </div> : ''}
                	</div>
                	
                	<div>
                		{this.state.otherArtistsFromSameMovement.length > 0 ?
                            <div><strong>Other artists from the same movement</strong> <br />
                                <ul>{otherArtistsFromSameMovement}</ul>
                            </div> : ''}
                	</div>                                     
                	
                	<div>
                		{this.state.birthPlacesOfDepictedPerson.length > 0 ?
                            <div><strong>Birth place of the depicted person</strong> <br />
                                <ul>{birthPlacesOfDepictedPerson}</ul>
                            </div> : ''}
                	</div>
                	
                	<div>
                		{this.state.artistsBornBeforeTheDateOfThePainting.length > 0 ?
                            <p><strong>The artists born before the date of the painting and who were born in Berlin :</strong> <br />
                                <ul>{artistsBornBeforeTheDateOfThePainting}</ul>
                            </p> : '' }
                	</div>   
                	
                   </div>
                                                              
                  </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.close}>close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
;


module.exports = PaintingModal;
