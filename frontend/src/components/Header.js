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
import { logout } from '../actions/users';

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
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/quickMatch/">Quick Match</NavLink>
            </NavItem>
            {props.userId !== undefined ? 
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {props.userName}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
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
    userId: state.users.userId,
    userName: state.users.userName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => dispatch(logout()),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);