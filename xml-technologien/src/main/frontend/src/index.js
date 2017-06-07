import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import { BreadcrumbList, ListItem, RDFaBreadcrumbList, RDFaListItem, MicrodataBreadcrumbList, MicrodataListItem } from 'react-semantic-breadcrumbs'


const breadcrumbs = (
  <BreadcrumbList format="RDFa" separator=" > ">
    <ListItem url="/">Home</ListItem>
    <ListItem url="/products">Products</ListItem>
    <ListItem url="/products/iphone-7-plus">iPhone 7 Plus</ListItem>
    <ListItem url="/artists">Artists</ListItem>
  </BreadcrumbList>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
