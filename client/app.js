/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

const MOUNT_NODE = document.getElementById("app");
ReactDOM.render(<App />, MOUNT_NODE);
