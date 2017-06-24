const React = require('react');
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from "react-bootstrap";

class NavigationPanel extends React.Component {
    render() {
		return (
				  <Navbar inverse collapseOnSelect>
				    <Navbar.Header>
				      <Navbar.Brand>
				        <a href="#">Sweden Painting</a>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse>
				      <Nav>
				        <NavItem eventKey={1} href="/about">Table</NavItem>
				        <NavItem eventKey={2} href="/api">API</NavItem>
				        <NavDropdown eventKey={3} title="Something else" id="basic-nav-dropdown">
				          <MenuItem eventKey={3.1}>Action</MenuItem>
				          <MenuItem eventKey={3.2}>Another action</MenuItem>
				          <MenuItem eventKey={3.3}>Something else here</MenuItem>
				          <MenuItem divider />
				          <MenuItem eventKey={3.3}>Separated link</MenuItem>
				        </NavDropdown>
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>
				);	
    }
};

module.exports = NavigationPanel;