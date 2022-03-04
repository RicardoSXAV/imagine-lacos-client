import React from "react";
import "./styles.scss";

import Icons from "../../assets/icons";

type IconProps = {
  iconSrc?: keyof typeof Icons;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

function Icon({ iconSrc, ...imageProps }: IconProps) {
  return (
    <img src={Icons[iconSrc]} className="pressable-icon" {...imageProps} />
  );
}

export default Icon;
