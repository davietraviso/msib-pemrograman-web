import {useState, useEffect } from "react"

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { navLinks } from "../data/index.js"
import { NavLink, useNavigate } from "react-router-dom"

import logo from '../assets/img/logo.png'

const NavBarComponents = () => {
  const [changeColor, setChangeColor] = useState(false)
  const [expanded, setExpanded] = useState(false); //to collapse

  const navigate = useNavigate();

  const changeBackgroundColor = () => {
    if (window.scrollY > 10) {
      setChangeColor(true)
    } else {
      setChangeColor(false)
    }
  };

  useEffect(() => {
    changeBackgroundColor();
  
    window.addEventListener('scroll', changeBackgroundColor);
    return () => window.removeEventListener('scroll', changeBackgroundColor);
  }, []);

  const handleNavLinkClick = (path) => {
    navigate(path);
    setExpanded(false); // Collapse the navbar after clicking a link
  };
 
  return (
    <div>
      <Navbar 
      expand="lg" 
      expanded={expanded} // Control navbar expansion
      onToggle={() => setExpanded(!expanded)} 
      fluid="md" 
      className={`navbar-custom d-flex justify-content-center align-items-center ${changeColor ? "color-active" : ""}`}>

        <Container className="navbar-container">
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo Maggo" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)}/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-center">
              {navLinks.map((link) => {
                return (
                  <div className="nav-link" key={link.id}>
                    <NavLink to={link.path} className={({ isActive, isPending }) => 
                      (isPending ? "pending" : isActive ? "active" : "")}
                      onClick={() => handleNavLinkClick(link.path)} end>
                        {link.text}
                    </NavLink>
                  </div>
                )
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
} 

export default NavBarComponents