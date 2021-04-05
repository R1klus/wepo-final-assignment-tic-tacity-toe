import "./Styles/index.scss"
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import WelcomeView from './Views/WelcomeView';
import DashboardView from './Views/DashboardView';
import GameView from './Views/GameView'
import {noAuth, useAuth} from "./Components/Authorization";

function App() {
    return (
        <Switch>
            <Route exact path="/" component={noAuth(WelcomeView)}/>
            <Route exact path="/dashboard" component={useAuth(DashboardView)}/>
            <Route exact path="/match/:id" component={useAuth(GameView)}/>
        </Switch>
    )
}

export default App;
