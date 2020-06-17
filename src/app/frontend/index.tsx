import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import isDev from "electron-is-dev"
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

    html, body, #root {
        width: 100%;
        height: 100%;
    }
`

if (isDev) {
    // FIXME: "Error: extension directory not found"
    // require("electron-react-devtools").install()
    // require("electron-redux-devtools").install()
}

ReactDOM.render(
    (
        <Provider store={store}>
            <Global />
            <App />
        </Provider>
    ),
    document.getElementById("root")
)
