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
					  "Bonde från NordingråFarmer from Nordingrå",
					  "Vattenfall, PorjusWaterfall, Porjus",
					  "ÅngermanälvenThe River Ångermanälven",
					  "Islossning, FaxälvenThe Ice Breaks up, Faxälven",
					  "Utsikt över Ragunda, JämtlandView of Ragunda, Jämtland",
					  "Motiv från SeineMotif from the Seine",
					  "Forsande bäckCascading Brook",
					  "Dam i svart hattLady in a Black Hat",
					  "Bränningen. Motiv från MedelhavetThe Mediterranean Breaker",
					  "BanarbetareNavvy",
					  "Flickan från SkottlandThe Scotch Girl",
					  "Höstafton, NordingråAutumn, Nordingrå",
					  "Vithårig lapp, KvikkjokkWhite-Haired Lapp, Kvikkjokk",
					  "HöstenAutumn",
					  "Sommarafton vid KallsjönA Summer Evening by Kallsjön",
					  "På väg mot Stora SjöfalletOn the Way to Stora Sjöfallet",
					  "Fiskarstugor vid älven. Motiv från Granvåg vid FaxälvenFishing Cottages by the River. Motif from Granvåg, Faxälven",
					  "Bonn am Rhein. VinterlandskapBonn am Rhein. Winter Landscape",
					  "Porträtt av folkhögskolelärare Andersson i FränstaMr Andersson from Främsta, Folh High School Teacher",
					  "På väg till SjöfalletOn the Way to 'Sjöfallet'",
					  "ModellstudieStudy of a Model",
					  "Liggande modellRecumbent Modell",
					  "Torne träsk om vårenTorne Marsh in Spring",
					  "Utsikt från KlockaFörstudie till Hösten"
					  ] };
		}
	
	renderPaintings() {
		  return this.state.paintings.map(name => (
		    <PaintingListItem key={name} name={name}/>
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