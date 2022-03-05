import React from "react";
import authService from "./services/auth-services";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
//
import './root.css';
//
import howdiyLogo from './img/howdiyWhite.png';
import howdiyHat from './img/cowboyHat.png';

function NavbarComponent({ isLoggedIn, user, setUser }) {
  const userLogout = () => {
    authService.logout().then(() => {
      setUser(null, false);
    });
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="navbar-bg">
        <Container className="navbar-main">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title={<img src={howdiyLogo} alt="navbarimg" width="100"
                  height="50"/>} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/">Home</NavDropdown.Item>
                <NavDropdown.Item href="/join">Join the Community</NavDropdown.Item>
                
                {isLoggedIn && user && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/categories">
                      Categories
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/howdiy/create">
                      Create a Howdiy!
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
            <Nav>
              {!isLoggedIn && (
                <>
                  <li>
                    <Nav.Link href="/signup">Sign up</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link href="/login">Log in</Nav.Link>
                  </li>
                </>
              )}
              {isLoggedIn && user && (
                <>
                  <NavDropdown title={<img src={howdiyHat} alt="navbarimg" width="100"
                  height="50"/>} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={() => userLogout()}>
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavbarComponent;
