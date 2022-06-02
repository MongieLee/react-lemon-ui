import * as React from "react";
import ReactDOM from "react-dom";
import Icon from "./icon/icon";
import Pagination from "./pagination/pagination";
import message from "./message/bootstrap";

const fn: React.MouseEventHandler = () => console.log("irun");

const App = () => {
  return (
    <>
      <button onClick={() => {
        message.success({content: "删除成功"});
      }}>dinaji
      </button>
      <button onClick={() => {
        message.error({content: "删除失败"});
      }}>error
      </button>
      <button onClick={(event) => {
        message.warning({content: "操作异常"});
      }}>success
      </button>
      <button onClick={() => {
        message.info({content: "操作提示"});
      }}>info
      </button>

      <Icon onClick={fn} className="ddssds" name="wechat"/>
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
