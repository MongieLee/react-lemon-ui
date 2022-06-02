import Message, {MessageProps} from "./message";
import ReactDOM from "react-dom";
import React from "react";

let i = 1;
const idGenerator = () => {
  return `lemon-message-no-${i++}`;
}

export const messageContainer = new Map<string, HTMLDivElement>()

export const createMessage = (options: Omit<MessageProps, "mode" | "componentId">, mode: MessageProps["mode"]) => {
  const element = document.createElement("div")
  const componentId = idGenerator()
  messageContainer.set(componentId, element)
  const instance = <Message {...{...options, componentId, mode}}/>
  document.body.appendChild(element);
  ReactDOM.render(instance, element);
}

type EmbedUtilsProps = Omit<MessageProps, "mode" | "componentId">

export const success = (options: EmbedUtilsProps) => {
  createMessage(options, "success")
}

export const error = (options: EmbedUtilsProps) => {
  createMessage(options, "error")
}

export const warning = (options: EmbedUtilsProps) => {
  createMessage(options, "warning")
}

export const info = (options: EmbedUtilsProps) => {
  createMessage(options, "info")
}

export default {
  success, error, warning, info
}