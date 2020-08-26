import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "../pages/Home";
import Octavian from "../pages/Octavian";

const MainSection = styled.main`
    padding: 10px 20px;

    a {
        color: #000;
    }
    a:hover {
        color: #fff;
    }
`;
const Main = () => (
    <MainSection>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/octavian" component={Octavian} />
        </Switch>
    </MainSection>
);

export default Main;
