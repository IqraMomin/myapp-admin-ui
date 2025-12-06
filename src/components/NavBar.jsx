import React, { useState } from "react";
import { Button, Form, Nav, Navbar, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../store/authSlice";

function NavBar({ showCart }) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

const logoutHandler = ()=>{
    dispatch(authActions.logout());
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    history.replace("/admin/auth");
}
  return (
    <Navbar
      bg="light"
      className="px-4 shadow-sm d-flex align-items-center"
      style={{ position: "fixed", top: 0, left: 0, width: "100%" }}
    >
      {/* LEFT MENU */}
      <Nav className="gap-4">
        <Nav.Link as={NavLink} to="/admin/home">HOME</Nav.Link>
        <Nav.Link as={NavLink} to="/admin/bookings">BOOKINGS</Nav.Link>
        <Nav.Link as={NavLink} to="/admin/listings">Manage Listings</Nav.Link>
      </Nav>

     

      {/* RIGHT ICONS */}
      <div className="ms-auto d-flex align-items-center gap-4">
        {/* Logout */}
        <Button variant="outline-danger" 
        onClick={logoutHandler}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </Button>
      </div>
    </Navbar>
  );
}

export default NavBar;
