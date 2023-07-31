import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Brand
      className="navMain"
        onClick={() => {
          navigate("/");
        }}
      >
        BookStore App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link
            onClick={() => {
              navigate("/perfil");
            }}
          >
            Perfil
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userID");
              navigate("/login");
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
