import React from "react";
import ReactDOM from "react-dom";
import "index.scss";
import Application from "components/Application";
import axios from "axios";
if (process.env.SERVER_URL) {
  axios.defaults.baseURL = process.env.SERVER_URL;
}

ReactDOM.render(<Application />, document.getElementById("root"));
