import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PaintingListItem from './PaintingListItem';
import './PaintingList.css';

class PaintingList extends Component {

	constructor(props) {
		  super(props);
		  this.state = { 
				 paintings : [
					  {recordId: 19568, name: "Bonde från Nordingrå", nameEn: "Farmer from Nordingrå"},
					  {recordId: 19928, name: "Vattenfall, Porjus", nameEn: "Waterfall, Porjus"}, 
					  {recordId: 20011, name: "Ångermanälven", nameEn: "The River Ångermanälven"}, 
					  {recordId: 20147, name: "Islossning, Faxälven", nameEn: "The Ice Breaks up, Faxälven"}, 
					  {recordId: 20202, name: "Utsikt över Ragunda, Jämtland", nameEn: "View of Ragunda, Jämtland"}, 
					  {recordId: 21072, name: "Motiv från Seine", nameEn: "Motif from the Seine"}, 
					  {recordId: 21576, name: "Forsande bäck", nameEn: "Cascading Brook"}, 
					  {recordId: 22602, name: "Dam i svart hatt", nameEn: "Lady in a Black Hat"}, 
					  {recordId: 22985, name: "Bränningen. Motiv från Medelhavet", nameEn: "The Mediterranean Breaker"}, 
					  {recordId: 23192, name: "Banarbetare", nameEn: "Navvy"}, 
					  {recordId: 23247, name: "Flickan från Skottland", nameEn: "The Scotch Girl"}, 
					  {recordId: 23414, name: "Höstafton, Nordingrå", nameEn: "Autumn, Nordingrå"}, 
					  {recordId: 23415, name: "Vithårig lapp, Kvikkjokk", nameEn: "White-Haired Lapp, Kvikkjokk"}, 
					  {recordId: 23420, name: "Hösten", nameEn: "Autumn"}, 
					  {recordId: 23743, name: "Sommarafton vid Kallsjön", nameEn: "A Summer Evening by Kallsjön"}, 
					  {recordId: 23835, name: "På väg mot Stora Sjöfallet", nameEn: "On the Way to Stora Sjöfallet"}, 
					  {recordId: 23836, name: "Fiskarstugor vid älven. Motiv från Granvåg vid Faxälven", nameEn: "Fishing Cottages by the River. Motif from Granvåg, Faxälven"}, 
					  {recordId: 23837, name: "Bonn am Rhein. Vinterlandskap", nameEn: "Bonn am Rhein. Winter Landscape"}, 
					  {recordId: 23838, name: "Porträtt av folkhögskolelärare Andersson i Fränsta", nameEn: "Mr Andersson from Främsta, Folh High School Teacher"}, 
					  {recordId: 25317, name: "På väg till Sjöfallet", nameEn: "On the Way to 'Sjöfallet'"}, 
					  {recordId: 25318, name: "Modellstudie", nameEn: "Study of a Model"}, 
					  {recordId: 25319, name: "Liggande modell", nameEn: "Recumbent Modell"}, 
					  {recordId: 25630, name: "Torne träsk om våren", nameEn: "Torne Marsh in Spring"}, 
					  {recordId: 36623, name: "Utsikt från Klocka", nameEn: "Förstudie till Hösten"}	  
					]
		  };
		}
	
	renderPaintings() {	
		return this.state.paintings.map(name => (
				<PaintingListItem key={name.recordId} name={name.name} nameEn={name.nameEn} recordId={name.recordId} />
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