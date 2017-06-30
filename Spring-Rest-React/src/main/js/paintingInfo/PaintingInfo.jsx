'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');
import NavigationPanel from './NavBar/NavigationPanel.js';

class Painting extends React.Component{
    constructor(props) {
	    super(props);
      this.state={
        paintingInf:[],
      };
	  }

    componentWillMount(){
      this.loadPaintingInf(this.props);
    }

    componentWillReceiveProps(nextProps){
      this.loadPaintingInf(nextProps)
    }

    componentDidMount(){
      this.loadPaintingInf(this.props);
    }
    loadPaintingInf(recordID){
      this.state..paintingInf.title="This is the title of my painting";
      this.state.paintingInf.artist="Picasso";
      this.state.paintingInf.date="1231";
      this.state.paintingInf.category="some category";
      this.state.paintingInf.inscription="some inscription";
      this.state.paintingInf.depicted_person="Mark Twain";
      this.state.paintingInf.technique_material="some material technique_material";
      this.state.paintingInf.measurements="some measurements";
      this.state.paintingInf.right_work="i have no clue what this is";
      this.state.paintingInf.imgsource="some path--- ";
      this.forceUpdate();
    }
    getDBPediaLInf(){
      //TO DO: get the information from DBPediaInf
      //it will be a random text
      this.state.projectInf.DBPediaInf="this is a text that will be probably about the artist who painted the painting. Probably it will be some basic informaiton, like when he was born, if he studied, where he studied, if he was married and so on and so forth.";
      this.forceUpdate();
    }


    render() {
  		return (
        <div>
          <NavBar/>
          <img src={C:\Users\Suzana Puscasu\Documents\GitHub\XML-Technologien-Project\Spring-Rest-React\src\main\resources\static\pic.jpg} className="painting2View"/>
          <div className="infoFROMxml">
            <p>Title: {this.state..paintingInf.title}</p>
            <p>Artist: {this.state.paintingInf.artist}</p>
            <p>Date: {this.state.paintingInf.date}</p>
            <p>Category: {this.state.paintingInf.category}</p>
            <p>Inscription: {this.state.paintingInf.inscription}</p>
            <p>Depicted person:{this.state.paintingInf.depicted_person} </p>
            <p>Technique/ Material: {this.state.paintingInf.technique_material}</p>
            <p>Measurements: {this.state.paintingInf.measurements}</p>
            <p>Right work: {this.state.paintingInf.right_work}</p>
          </div>
          <div className="infoFROMdbpedia">
            <p>{this.state.paintingInf.DBPediaInf}</p>
          </div>
          <button className="backButton"> BACK</button>
        </div>
      )
    }
}
