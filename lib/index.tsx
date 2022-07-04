import * as React from "react";
import ReactDOM from "react-dom";
import Icon from "./icon/icon";
import Pagination from "./pagination/pagination";
import message from "./message/bootstrap";
import Button from "./button/button";
import Modal from "./modal/modal";
import "./index.less";
import {useState} from "react";

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Modal visible={visible} maskClosable onCancelClick={() => setVisible(false)} onOkClick={() => setVisible(false)} >
        <div>123</div>
      </Modal>
      <hr/>
      <Button onClick={() => {
        message.success({content: "删除成功"});
      }} type={"primary"}>primary</Button>
      <Button>default</Button>
      <Button type={"danger"}>danger</Button>
      <Button type={"ghost"}>ghost</Button>
      <Button onClick={() => setVisible(!visible)} type={"link"}>link</Button>
      <hr/>
      <Icon name="wechat"/>
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
