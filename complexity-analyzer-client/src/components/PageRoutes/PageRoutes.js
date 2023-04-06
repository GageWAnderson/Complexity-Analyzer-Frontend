import React from "react";
import { Route, Routes } from 'react-router-dom';
import routes from "../../data/routes.js";
import { Container } from "reactstrap";
import Homepage from "../../pages/Homepage/Homepage.js";
import Profile from "../../pages/Profile/Profile.js";
import Results from "../Results/Results.js";

const PageRoutes = () => {
    return (
        <Container style={{paddingTop: '100px', paddingBottom: '100px', boxSizing: 'border-box'}}>
            <Routes>
                <Route exact path={routes.home} element={<Homepage />}></Route>
                <Route exact path={routes.profile} element={<Profile />}></Route>
                <Route exact path={routes.results} element={<Results />}></Route>
            </Routes>
        </Container>
    );
};

export default PageRoutes;