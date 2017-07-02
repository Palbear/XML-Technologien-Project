import React from 'react'
import {
  Route
} from 'react-router-dom'
import PaintingTable from '../paintingTable/PaintingTable.js';
import PaintingList from '../paintingList/PaintingList.js';
import PaintingInfo from '../paintingInfo/PaintingInfo.jsx';

const BasicRoute = () => (
      <div>
          <Route exact path="/" component={PaintingTable}/>
          <Route path="/table" component={PaintingTable}/>
          <Route path="/paintings" component={PaintingList}/>
          <Route path="/paintinginfo" component={PaintingInfo}/>
      </div>
)
export default BasicRoute
