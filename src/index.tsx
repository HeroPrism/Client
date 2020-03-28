import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';

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

ReactDOM.render(
  <React.StrictMode>
    <App history={history} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
