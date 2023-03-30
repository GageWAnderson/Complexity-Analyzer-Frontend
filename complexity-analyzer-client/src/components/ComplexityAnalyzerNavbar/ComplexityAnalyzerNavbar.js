import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import routes from '../../data/routes';
import { NavLink as RRNavLink } from "react-router-dom";
import { Auth } from 'aws-amplify';

const ComplexityAnalyzerNavbar = () => {

    const [signOutError, setSignOutError] = useState(false);

    const handleSignOut = () => {
        Auth.signOut({ global: true }).catch(err => {
            setSignOutError(true);
        });
    }

    return (
        <Navbar color="dark" dark expand="md" fixed="top">
            <NavbarBrand href="#">Code Complexity Analyzer</NavbarBrand>
            <Nav navbar>
                <NavItem>
                    <NavLink to={routes.home} tag={RRNavLink}>Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to={routes.results} tag={RRNavLink}>Results</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to={routes.profile} tag={RRNavLink}>Profile</NavLink>
                </NavItem>
            </Nav>
            {signOutError && <p className='text-danger'>Error signing out</p>}
            <Button className='ml-auto' onClick={handleSignOut} color="danger">Sign Out</Button>
        </Navbar>
    );
};

export default ComplexityAnalyzerNavbar;