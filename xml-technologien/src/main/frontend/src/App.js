import React from 'react';
import $ from 'jquery'
import MatchCard from './MatchCard'
import AddMatchDialog from './AddMatchDialog'
import './App.css'
import BCrumbs from './BCrumbs';
import PaintingList from './PaintingList';

export default class App extends React.Component {
   state = {
     matches: []
   }

  componentDidMount() {
    $.getJSON( "/api/matches", ( data ) => {
      this.setState({ matches: data });
    });
  }

  render = () => {
    return (
      <div>
        <div className="md-grid">
          {this.state.matches.map((match) =>
            <MatchCard match={match}/>
          )}
        </div>
        
        <div className="App">   	
        	<BCrumbs name="Tester" />       	
        	<h4>Sample paintings list</h4>
        	<PaintingList />
        </div>
        
        <AddMatchDialog />
      </div>
    )
  }
}
