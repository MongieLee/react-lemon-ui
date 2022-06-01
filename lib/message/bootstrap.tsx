import Message, {MessageProps} from "./message";
import ReactDOM from "react-dom";
import React, {createRef, ReactElement} from "react";
import message from "./message";

let i = 1;
const idGenerator = () => {
  return `lemon-message-no-${i++}`;
}

export const messageContainer = new Map<string, HTMLDivElement | null>()


export const createMessage = (options: Omit<MessageProps, "mode">, mode: MessageProps["mode"]) => {
  const element = document.createElement("div")
  const componentId = idGenerator()
  messageContainer.set(idGenerator(), element)
  const portal = <Message {...{...options, componentId, mode}}/>
  document.body.appendChild(element);
  ReactDOM.render(portal, element);
  // element.remove();
}

// const removeMessage = (dom: HTMLElement) => {
//   dom.remove();
// }

export const success = (options: Omit<MessageProps, "mode">) => {
  createMessage(options, "success")
}

export const error = () => {

}

export const warning = () => {

}

export const info = () => {

}
