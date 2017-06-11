import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PaintingListItem from './PaintingListItem';
import './PaintingList.css';

class PaintingList extends Component {

	constructor(props) {
		  super(props);
		  this.state = { 
				  paintings: [
					  ["19568", "Bonde från Nordingrå", "Farmer from Nordingrå"], 
					  ["19928", "Vattenfall, Porjus", "Waterfall, Porjus"], 
					  ["20011", "Ångermanälven", "The River Ångermanälven"], 
					  ["20147", "Islossning, Faxälven", "The Ice Breaks up, Faxälven"], 
					  ["20202", "Utsikt över Ragunda, Jämtland", "View of Ragunda, Jämtland"], 
					  ["21072", "Motiv från Seine", "Motif from the Seine"], 
					  ["21576", "Forsande bäck", "Cascading Brook"], 
					  ["22602", "Dam i svart hatt", "Lady in a Black Hat"], 
					  ["22985", "Bränningen. Motiv från Medelhavet", "The Mediterranean Breaker"], 
					  ["23192", "Banarbetare", "Navvy"], 
					  ["23247", "Flickan från Skottland", "The Scotch Girl"], 
					  ["23414", "Höstafton, Nordingrå", "Autumn, Nordingrå"], 
					  ["23415", "Vithårig lapp, Kvikkjokk", "White-Haired Lapp, Kvikkjokk"], 
					  ["23420", "Hösten", "Autumn"], 
					  ["23743", "Sommarafton vid Kallsjön", "A Summer Evening by Kallsjön"], 
					  ["23835", "På väg mot Stora Sjöfallet", "On the Way to Stora Sjöfallet"], 
					  ["23836", "Fiskarstugor vid älven. Motiv från Granvåg vid Faxälven", "Fishing Cottages by the River. Motif from Granvåg, Faxälven"], 
					  ["23837", "Bonn am Rhein. Vinterlandskap", "Bonn am Rhein. Winter Landscape"], 
					  ["23838", "Porträtt av folkhögskolelärare Andersson i Fränsta", "Mr Andersson from Främsta, Folh High School Teacher"], 
					  ["25317", "På väg till Sjöfallet", "On the Way to 'Sjöfallet'"], 
					  ["25318", "Modellstudie", "Study of a Model"], 
					  ["25319", "Liggande modell", "Recumbent Modell"], 
					  ["25630", "Torne träsk om våren", "Torne Marsh in Spring"], 
					  ["36623", "Utsikt från Klocka", "Förstudie till Hösten"] 	  		  
				 ]
		  };
		}
	
	renderPaintings() {
			return this.state.paintings.map(name => (
				<PaintingListItem key={name[0]} name={name[1]} nameEn={name[2]} recordId={name[0]} />
		  ));
		}
	
	render() {
	    return (
	      <div className="PaintingList">
	        <h4>PaintingList Component talking</h4>
      		<p>Sample paintings list by Helmer Osslund</p>
	        {this.renderPaintings()}	        
	       </div>
	    );
	  }
}

export default PaintingList;