const React = require('react');
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

class NavigationPanel extends React.Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">NM Sweden Paintings</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                    	<LinkContainer to="/table">
                    		<NavItem >Table</NavItem>
                    	</LinkContainer>
                        <LinkContainer to="/paintings">
                            <NavItem >Filtered Paintings</NavItem>
                        </LinkContainer>                       
                        <NavDropdown eventKey={3} title="Help" id="basic-nav-dropdown">
                        	<LinkContainer to="/apihelp">
                        		<MenuItem eventKey={3.1}>Api</MenuItem>
                        	</LinkContainer>                           
                            <MenuItem divider/>
                            <LinkContainer to="/sample">
                        		<MenuItem eventKey={3.3}>XSLT Sample (Beta)</MenuItem>
                        	</LinkContainer>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};

module.exports = NavigationPanel;