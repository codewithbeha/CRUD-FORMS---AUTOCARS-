import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export class Navigation extends Component {

    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav " />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white font-weight-bolder" to="/">
                    AUTOSALLONI ✰
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white font-weight-bolder" to="/department">
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white font-weight-bolder" to="/employee">
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white font-weight-bolder" to="/city">
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white font-weight-bolder" to="/country">
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white font-weight-bolder" to="/users">
                        Users
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white font-weight-bolder" to="/logout">
                        Logout
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white font-weight-bolder" to="/auto">
                        Auto
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white font-weight-bolder" to="/place">
                        Place
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white font-weight-bolder" to="/extras">
                        Extras
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white font-weight-bolder" to="/details">
                        Details
                    </NavLink>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}