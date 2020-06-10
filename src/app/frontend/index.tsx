import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import App from "./App";

const Styles = createGlobalStyle`
    *, *::after, *::before {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: Roboto, sans-serif;
    }
`

ReactDOM.render(
    <>
        <Styles />
        <App />
    </>,
    document.getElementById("root")
)
