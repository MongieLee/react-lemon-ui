import * as React from "react";
import ReactDOM from "react-dom";
const fn: React.MouseEventHandler = () => console.log("irun");

import Icon from "./icon";
ReactDOM.render(
  <Icon onClick={fn} name="wechat" />,
  document.querySelector("#root")
);
