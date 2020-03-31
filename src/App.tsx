import React, { FC, createContext, Dispatch, useReducer } from 'react';
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
import { TasksResponse } from './services/TaskService/models/TasksResponse';
import { TaskService } from './services/TaskService/TaskService';
import { Auth0Provider } from './AuthenticationProvider';

const theme = {
    global: {
        colors: {
            "primary": "#03A5FC",
            "secondary": "#6F94BC",
            "tertiary": "#E6F4F1",
            "neutral": "#F4FAFF",
            "red": "#FA7651"
        },
        font: {
            family: "Open Sans, sans-serif",
            size: "15px"
        },
    },
    heading: {
        font: {
            family: "Dosis, sans-serif"
        }
    }
}

const history = createBrowserHistory({
    basename: "/"
});

interface AppProps {
    history: History;
}

export interface IAppContext {
    state?: any;
    dispatch?: any;
}

interface TaskState {
    tasks?: any | [];
    bounds?: any;
}

interface TaskAction {
    type: string;
    payload?: any;
}

export const TaskReducer = (state: TaskState, action: TaskAction) : TaskState => {
    switch (action.type) {
        case 'SetTasks':
            return {
                tasks: action.payload
            }
        case 'SetBounds':
        default:
            if (action.payload == state.bounds) {
                return { };
            }
            return {
                bounds: action.payload
            };
    }
}

export const AppContext = createContext<IAppContext>({});

const onRedirectCallback = (redirectResult?: RedirectLoginResult) => {
    const targetUrl = redirectResult
    && redirectResult.appState
    && redirectResult.appState.targetUrl
        ? redirectResult.appState.targetUrl
        : window.location.pathname
        
    history.push(targetUrl)
};

export const App : FC<AppProps> = (props) => {
    const [ state, dispatch ] = useReducer(TaskReducer, {});

    return (
        <Grommet theme={theme} className="App" full>
            <Auth0Provider
                domain="dev-v5r9df8o.auth0.com"
                client_id={"daisST4Z4C24Pg81Atd7XJJncCPea287"}
                // audience={"https://50992717.ngrok.io/"}
                redirect_uri={window.location.origin}
                onRedirectCallback={onRedirectCallback} 
            >
                
                <AppContext.Provider value={{ state, dispatch }}>
                    <Router history={history}>
                        <Switch>
                            <RouteCollection routes={routes} />
                        </Switch>
                    </Router>
                    <Header />
                </AppContext.Provider>
            </Auth0Provider>
        </Grommet>
    );
}