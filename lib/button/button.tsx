import React, {FC, HTMLAttributes, PropsWithChildren} from 'react';
import "./index.less"
import classes from "../utils/classes";

type Props = {
  type?: "primary" | "ghost" | "danger" | "link"
} & HTMLAttributes<HTMLButtonElement>

const Button: FC<PropsWithChildren<Props>> = (props) => {
  const {children, type, ...rest} = props;

  return <button {...rest} className={classes("lm-button", type)}>{children}</button>;
}

export default Button;
