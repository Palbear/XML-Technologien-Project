import React from 'react'
import {
  Route
} from 'react-router-dom'
import PaintingTable from '../paintingTable/PaintingTable.js';
import PaintingList from '../paintingList/PaintingList.js';
import PaintingInfo from '../paintingInfo/PaintingInfo.jsx';
import Gallery from '../gallery/Gallery.js';
import Sample from '../sample/Sample.js';
import ApiHelp from '../apihelp/ApiHelp.js';

const BasicRoute = () => (
      <div>
          <Route exact path="/" component={Gallery}/>
          <Route path="/table" component={PaintingTable}/>
          <Route path="/paintings" component={PaintingList}/>
          <Route path="/paintinginfo" component={PaintingInfo}/>
          <Route path="/gallery" component={Gallery}/>
          <Route path="/sample" component={Sample}/>
          <Route path="/apihelp" component={ApiHelp}/>
      </div>
)
export default BasicRoute
