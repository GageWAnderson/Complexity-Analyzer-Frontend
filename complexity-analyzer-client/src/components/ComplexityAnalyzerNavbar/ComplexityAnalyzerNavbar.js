import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Container, Row, Col } from 'reactstrap';
import routes from '../../data/routes';
import { NavLink as RRNavLink } from "react-router-dom";
import { Auth } from 'aws-amplify';

const ComplexityAnalyzerNavbar = ({ signOut }) => {

    const [signOutError, setSignOutError] = useState(false);

    const handleSignOut = () => {
        Auth.signOut({ global: true }).catch(err => {
            setSignOutError(true);
        });
    }

    return (
        <Navbar color="dark" dark expand="md" fixed="top">
            <Container fluid>
                <Row xs="3">
                    <Col className="d-flex justify-content-left">
                        <NavbarBrand href="#">Code Complexity Analyzer</NavbarBrand>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Nav navbar>
                            <NavItem>
                                <NavLink to={routes.home} tag={RRNavLink}>Editor</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to={routes.results} tag={RRNavLink}>Results</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to={routes.profile} tag={RRNavLink}>Profile</NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        {signOutError && <p className='text-danger'>Error signing out</p>}
                        <Button className='ml-auto' onClick={handleSignOut} color="danger">Sign Out</Button>
                    </Col>
                </Row>
            </Container>

        </Navbar>
    );
};

export default ComplexityAnalyzerNavbar;