import React from "react";
import "./importIcons";
import "./icons.scss";
import classes from "./utils/classes";
interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
}

const Icon: React.FunctionComponent<IconProps> = ({
  name,
  className,
  ...resProps
}) => {
  return (
    <svg className={classes("rl-icon", className)} {...resProps}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};
Icon.defaultProps = {
  name: "wechat",
};

export default Icon;
