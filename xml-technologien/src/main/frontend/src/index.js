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
    <ListItem url="/artists">Artists</ListItem>
    <ListItem url="/artists/leonardo-da-vinci">Leonardo da Vinci</ListItem>
  </BreadcrumbList>
)

const breadcrumbsPaintings = (
  <BreadcrumbList format="RDFa" separator=" > ">
    <ListItem url="/">Home</ListItem>
    <ListItem url="/paintings">Paintings</ListItem>
    <ListItem url="/paintings/mona-lisa">Mona Lisa</ListItem>
  </BreadcrumbList>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
