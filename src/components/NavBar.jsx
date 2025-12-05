import React, { useState } from "react";
import { Button, Form, Nav, Navbar, InputGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavBar({ showCart }) {
  const [search, setSearch] = useState("");

  return (
    <Navbar
      bg="light"
      className="px-4 shadow-sm d-flex align-items-center"
      style={{ position: "fixed", top: 0, left: 0, width: "100%" }}
    >
      {/* LEFT MENU */}
      <Nav className="gap-4">
        <Nav.Link as={NavLink} to="/admin/home">HOME</Nav.Link>
        <Nav.Link as={NavLink} to="/user/products">PRODUCTS</Nav.Link>
        <Nav.Link as={NavLink} to="/user/orders">ORDERS</Nav.Link>
      </Nav>

     

      {/* RIGHT ICONS */}
      <div className="ms-auto d-flex align-items-center gap-4">
        {/* Logout */}
        <Button variant="outline-danger">
          <i className="bi bi-box-arrow-right"></i> Logout
        </Button>
      </div>
    </Navbar>
  );
}

export default NavBar;
