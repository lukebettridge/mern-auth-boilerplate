import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";

import App from "./components/App";

moment.locale("en-gb");

const MOUNT_NODE = document.getElementById("app");
ReactDOM.render(<App />, MOUNT_NODE);
