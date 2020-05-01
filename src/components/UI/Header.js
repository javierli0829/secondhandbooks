/* global window */
import React, { useState } from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  Collapse,
  NavbarToggler,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Config from '../../constants/config';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <Navbar dark className="bg-gray-600" expand="md">
        <Link to="/" className="navbar-brand" style={{ color: '#FFF' }}>
          {Config.appName}
        </Link>

        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link className={`nav-link ${window.location.pathname === '/' && 'active'}`} to="/">
                <span>Home</span>
              </Link>
            </NavItem>
            {/* <NavItem>
              <Link
                className={`nav-link ${window.location.pathname.startsWith('/article') && 'active'}`}
                to="/articles/"
              >
                <span>Articles</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link
                className={`nav-link ${window.location.pathname.startsWith('/example-form') && 'active'}`}
                to="/example-form/"
              >
                <span>Form</span>
              </Link>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
