import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import '../styles/Header.css';
import { logout } from '../actions/user';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { handleLogout } = props;

  return (
    <div className="header">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Second-hand Book Exchange</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="headerNavBar" navbar>
            {props.user !== undefined ? 
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {props.user.username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/profile/">
                    Profile
                  </DropdownItem>
                  <DropdownItem href="/quickMatch/">
                    QuickMatch
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={handleLogout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> 
              :
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => {
      dispatch(logout());
      window.location.reload();
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);