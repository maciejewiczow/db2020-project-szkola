import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
// import isDev from "electron-is-dev"

import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";
import store from './store'

const Global = createGlobalStyle`
    *, *::after, *::before {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        font-weight: 300;
    }

    html, body, #app {
        width: 100%;
        height: 100%;
    }
`

// FIXME: hacky hack
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap';
document.head.appendChild(link);

ReactDOM.render(
    (
        <Provider store={store}>
            <Global />
            <App />
        </Provider>
    ),
    document.getElementById("app")
)
