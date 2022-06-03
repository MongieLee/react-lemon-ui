import React, {FC, useEffect, useRef} from 'react';
import "./message.less"
import classes from "../utils/classes";
import ReactDOM from "react-dom";
import {messageContainer} from "./bootstrap"
import Icon from "../icon/icon"

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
  const {componentId, duration, content, mode} = props
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stId = setTimeout(() => {
        const wrapperEle = messageContainer.get(componentId);
        ReactDOM.unmountComponentAtNode(container.current!.parentElement as HTMLDivElement)
        wrapperEle!.remove();
      },
      (typeof duration === 'number') ? duration * 1000 : 3000)
    return () => {
      if (stId) {
        window.clearTimeout(stId)
      }
    };
  }, []);

  return (
    <div className={classes("lm-message-container")}
         ref={container}>
      <div className={classes("lm-message")}>
        <Icon className={"icon"} name={mode}/>
        <div className={'content'}>{content}</div>
      </div>
    </div>)
}

export default Message;