import React, { FC, createContext, useReducer } from 'react';
import { createBrowserHistory, History } from "history";
import { Router, Switch } from "react-router-dom";
import { Grommet } from 'grommet';
import { Header } from './components/Layout/Header';
import { RouteCollection } from './components/Routing/RouteCollection';
import { routes } from './routing';
import { Auth0Provider } from './AuthenticationProvider';
import { Bounds } from './services/TaskService/models/TasksRequest';

const theme = {
    global: {
        colors: {
            "brand":  "#03A5FC",
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
    page?: number
    bounds?: Bounds;
    center?: any;
    zoom?: any;
}

interface TaskAction {
    type: string;
    payload?: any;
}

export const TaskReducer = (state: TaskState, action: TaskAction) : TaskState => {
    switch (action.type) {
        case 'SetTasks':
            return {
                tasks: action.payload,
                bounds: state.bounds,
                page: state.page,
                center: state.center,
                zoom: state.zoom
            }
        case 'SetPage':
            return {
                page: action.payload,
                tasks: state.tasks,
                bounds: state.bounds,
                center: state.center,
                zoom: state.zoom
            }
        case 'SetBounds':
        default:
            if (action.payload === state.bounds) {
                return { 
                    tasks: state.tasks,
                    bounds: state.bounds,
                    page: 0,
                    center: state.center,
                    zoom: state.zoom
                };
            }
            return {
                bounds: action.payload.bounds,
                tasks: state.tasks,
                page: 0,
                center: action.payload.center,
                zoom: action.payload.zoom
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
    const [ state, dispatch ] = useReducer(TaskReducer, { 
        page: 0,
        center: {
            lat: 33.425522,
            lng: -111.941254
        },
        zoom: 10
    });

    return (
        <Grommet theme={theme} className="App" full>
            <Auth0Provider
                domain="dev-v5r9df8o.auth0.com"
                client_id={"daisST4Z4C24Pg81Atd7XJJncCPea287"}
                audience={"https://heroprism.azurewebsites.net/"}
                redirect_uri={window.location.origin}
                onRedirectCallback={onRedirectCallback}
                history={history}
            >
                
                <AppContext.Provider value={{ state, dispatch }}>
                    <Router history={history}>
                        <Header />
                        <Switch>
                            <RouteCollection routes={routes} />
                        </Switch>
                    </Router>
                </AppContext.Provider>
            </Auth0Provider>
        </Grommet>
    );
}