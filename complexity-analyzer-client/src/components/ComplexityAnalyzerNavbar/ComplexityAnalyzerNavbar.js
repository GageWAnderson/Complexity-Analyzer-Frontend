import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Container, Row, Col, Alert } from 'reactstrap';
import routes from '../../data/routes';
import { useDispatch } from 'react-redux';
import { signUserOut } from '../../redux/profileSlice';
import { NavLink as RRNavLink } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { setSignOutError } from '../../redux/profileSlice';

const ComplexityAnalyzerNavbar = ({ signOut }) => {

    const dispatch = useDispatch();

    const handleSignOut = () => {
        Auth.signOut({ global: true })
            .then(data => {
                dispatch(signUserOut());
                dispatch(setSignOutError(false));
                signOut();
            })
            .catch(err => {
                dispatch(setSignOutError(true));
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
                        <Button className='ml-auto' onClick={handleSignOut} color="danger">Sign Out</Button>
                    </Col>
                </Row>
            </Container>

        </Navbar>
    );
};

export default ComplexityAnalyzerNavbar;