import * as React from "react";
import ReactDOM from "react-dom";
import Icon from "./icon/icon";
import Pagination from "./pagination/pagination";
import message from "./message/bootstrap";
import Button from "./button/button";

const fn: React.MouseEventHandler = () => console.log("irun");

const App = () => {
  return (
    <>
      <Button onClick={() => {
        message.success({content: "删除成功"});
      }} type={"primary"}>primary</Button>
      <Button>default</Button>
      <Button type={"danger"}>danger</Button>
      <Button type={"ghost"}>ghost</Button>
      <Button type={"link"}>link</Button>
      <hr/>
      <Icon onClick={fn} className="ddssds" name="wechat"/>
      <hr/>
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
ReactDOM.render(<App/>, document.querySelector("#root"));
