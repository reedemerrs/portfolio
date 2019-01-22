import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink target="_blank" href="https://www.eurobank.rs/pocetna.1.html">Eurobank</NavLink>
          </NavItem>
          <NavItem>
            <NavLink target="_blank" href="http://pretraga3.apr.gov.rs/pretragaObveznikaFI">APR Finance</NavLink>
          </NavItem>
          <NavItem>
            <NavLink target="_blank" href="http://pretraga2.apr.gov.rs/unifiedentitysearch">APR General Info</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Tools
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag="a" href="/calculator">
                Calculator
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>;
  }
}
