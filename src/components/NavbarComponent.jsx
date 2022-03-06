import React from "react";
import authService from "./services/auth-services";
import { Container, Navbar, Nav, NavDropdown, Offcanvas } from "react-bootstrap";
//
import './root.css';
//
import ShelterLogo from './img/Shelter.png';
import PeopleIcon from './img/people.png';

function NavbarComponent({ isLoggedIn, user, setUser }) {
  console.log(user, "this is the user")
  const userLogout = () => {
    authService.logout().then(() => {
      setUser(null, false);
    });
  };

  return (
    <div style={{height: "12vh", marginTop: "120px"}}>
      <Navbar collapseOnSelect expand="lg" className="navbar-bg">
        <Container className="navbar-main">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Offcanvas id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="bottom" style={{backgroundColor: "#FA9A84"}}
    ><Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
      </Offcanvas.Header>
          <Offcanvas.Body style={{backgroundColor: "#FFA7C0", display:"flex", flexDirection:"row"}}>
            <Nav className="me-auto" >
              <NavDropdown title={<img src={ShelterLogo} alt="navbarimg" width="100"
                  height="50"/>} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/">Home</NavDropdown.Item>
                <NavDropdown.Item href="/join">Donate</NavDropdown.Item>
                
                {isLoggedIn && user && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/categories">
                      Find Shelter
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/howdiy/create">
                      Offer Shelter
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
                  <NavDropdown title={<img src={PeopleIcon} alt="navbarimg" width="50"
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
          
          </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavbarComponent;
