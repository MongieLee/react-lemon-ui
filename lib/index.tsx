import * as React from "react";
import ReactDOM from "react-dom";
import Icon from "./icon";
import Pagination from "./pagination";
import * as message from "./message/bootstrap";
import {ReactElement, useEffect, useRef} from "react";
import Message from "./message/message";
import {createMessage} from "./message/bootstrap";

const fn: React.MouseEventHandler = () => console.log("irun");

const root = document.querySelector("body")

class message2 {
  static success(msg: string) {
    var refObject = React.createRef<HTMLDivElement>();
    setTimeout(() => {
      console.log(refObject)
    }, 1000)

    console.log(msg);
    // @ts-ignore
    //  ReactDOM.createPortal(<div ref={refObject}>{msg}</div>, root!)
    return ReactDOM.createPortal(<div>132456</div>, root!)
  }
}

const App = () => {
  useEffect(() => {
    message.success({content: "1"})
  }, [])
  // setTimeout(() => {
  //
  // }, 1000)
  const ref = useRef<HTMLDivElement>(null);
  // setTimeout(()=>{
  //   console.log(ref)
  //   console.log(ref.current)
  //   console.log(ref.current?.remove())
  //   // ref.current!.remove();
  // },3000)
  return (
    <>
      <Icon onClick={fn} className="ddssds" name="wechat"/>
      <Pagination
        total={202}
        currentPage={1}
        onPageChange={(e) => {
          console.log(`这是回调函数的返回值:${e}`);
        }}
      />
      {/*<Message ref={ref} mode={"success"} content={"jkljkl"}/>*/}
    </>
  );
};
ReactDOM.render(<App/>, document.querySelector("#root"));
