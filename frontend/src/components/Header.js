import React, { useState , Fragment} from 'react';
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css';
import { logout } from '../actions/user';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { handleLogout } = props;

  return (
    <div className="header">
      <Navbar expand="md">
        <NavbarBrand className="headerTitle" href="/">Green Book</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="headerNavBar" navbar>
            {props.user !== undefined ? 
              <Fragment>
                <NavItem>
                  <NavLink className="headerText" href="/quickMatch/">Quick Match</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle className="headerText" nav caret>
                    <FontAwesomeIcon className="headerUserIcon" icon={faUser}/>
                    {props.user.username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="/profile/">
                      Profile
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={handleLogout}>
                      <strong>Logout</strong>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> 
              </Fragment>
              :
              <NavItem>
                <NavLink className="headerText" href="/login">Login / Sign up</NavLink>
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