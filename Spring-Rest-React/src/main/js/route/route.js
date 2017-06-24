import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import PaintingList from '../paintingList/PaintingList.js'

const BasicRoute = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={PaintingList}/>
      <Route path="/about" component={PaintingList}/>
      <Route path="/topics" component={PaintingList}/>
    </div>
  </Router>
)
export default BasicRoute