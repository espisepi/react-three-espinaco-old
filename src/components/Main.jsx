import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "../pages/Home";

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
        </Switch>
    </MainSection>
);

export default Main;
