import React, { FC } from 'react';
import { createBrowserHistory, History } from "history";
import { Router, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import css from './App.module.scss';
import { Grommet, Box } from 'grommet';
import { Header } from './components/Layout/Header';
import { Map } from './components/Map/Map';
import { TaskList } from './components/Tasks/TaskList';
import { RouteCollection } from './components/Routing/RouteCollection';
import { routes } from './routing';

const theme = {
    global: {
        colors: {
            "primary": "#03A5FC",
            "secondary": "#6F94BC",
            "tertiary": "#E6F4F1",
            "neutral": "#F4FAFF",
            "red": "#FA7651"
        }
    }
}

const history = createBrowserHistory({
    basename: "/"
});

interface AppProps {
    history: History;
}

export const App : FC<AppProps> = (props) => {
  return (
    <Grommet theme={theme} className="App" full>
        <Router history={history}>
            <Switch>
                <RouteCollection routes={routes} />
            </Switch>
        </Router>
        <Header />
    </Grommet>
  );
}