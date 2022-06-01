import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import "./message.scss"
import classes from "../utils/classes";
import ReactDOM from "react-dom";
import {messageContainer} from "./bootstrap"

export interface MessageProps {
  duration?: number;
  position?: "top" | "bottom" | "left" | "right" | "center";
  mode: "success" | "error" | "info" | "warning";
  content: string | React.ReactElement;
  onClose?: () => undefined;
  className?: string;
  style?: React.CSSProperties;
  componentId: string;
}


const Message: FC<MessageProps> = (props) => {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const stId = setTimeout(() => {
        // setVisible(false)
        const htmlDivElement = messageContainer.get(props.componentId);
        console.log(htmlDivElement)
        ReactDOM.unmountComponentAtNode(container.current!.parentElement as HTMLDivElement)
        // container.current!.parentElement?.remove()
      },
      props.duration ? props.duration * 1000 : 3000)
    return () => {
      if (stId) {
        window.clearTimeout(stId)
      }
      console.log("组件销毁了")
    };
  }, []);

  return (<div className={classes("lemon-message-container")} ref={container}>
    <div className={classes("message")}>test</div>
  </div>)
}


export default Message;