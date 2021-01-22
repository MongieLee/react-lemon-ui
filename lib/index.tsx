import * as React from "react";
import ReactDOM from "react-dom";
import Icon from "./icon";
import Pagination from "./pagination";

const fn: React.MouseEventHandler = () => console.log("irun");

const App = () => {
  return (
    <>
      <Icon onClick={fn} className="ddssds" name="wechat" />
      <Pagination
        total={202}
        currentPage={1}
        onPageChange={(e) => {
          console.log(`这是回调函数的返回值:${e}`);
        }}
      />
    </>
  );
};
ReactDOM.render(<App />, document.querySelector("#root"));
