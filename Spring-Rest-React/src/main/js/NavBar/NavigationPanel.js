const React = require('react');
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from "react-bootstrap";

class NavigationPanel extends React.Component {
    render() {
		return (
				  <Navbar inverse collapseOnSelect>
				    <Navbar.Header>
				      <Navbar.Brand>
				        <a href="#">Home</a>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse>
				      <Nav>
				        <NavItem eventKey={1} href="/about">Information about the project</NavItem>
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>
				);	
    }
};

module.exports = NavigationPanel;
