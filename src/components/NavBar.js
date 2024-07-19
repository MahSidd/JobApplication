import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import profileAvatar from "../assests/img/profile.jpg"; // Import your avatar image here
import { useState, useEffect } from "react";
import "../styling/Navbar.css";

function NavBar() {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home" className="nav-logo">JOB-HUNT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="#home"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#ourjobs"
              className={
                activeLink === "ourjobs" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("ourjobs")}
            >
              Our jobs
            </Nav.Link>
          </Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" bsPrefix="p-0">
              <span style={{ margin: "20px", color: "#fff" }}>Mahnoor</span>
              <img
                src={profileAvatar}
                alt="Profile Avatar"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
              <Dropdown.Item href="/login">Logout</Dropdown.Item>
              
              
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
