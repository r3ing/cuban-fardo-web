import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/styles/globals.css";
import "./assets/styles/normalize.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootswatch/dist/yeti/bootstrap.min.css";
//import { render } from "react-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { BrowserRouter } from "react-router-dom";

const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE
}

ReactDOM.render(
  <>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </BrowserRouter>,
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
