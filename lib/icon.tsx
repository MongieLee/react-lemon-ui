import React from "react";
import "./importIcons";
import "./icons.scss";
interface IconProps {
  name: string;
  onClick?: React.MouseEventHandler<SVGElement>;
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
  return (
    <svg className="rl-icon" onClick={props.onClick}>
      <use xlinkHref={`#${props.name}`} />
    </svg>
  );
};
Icon.defaultProps = {
  name: "wechat",
};

export default Icon;
