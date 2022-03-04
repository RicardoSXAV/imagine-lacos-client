import "./styles.scss";

import { ButtonHTMLAttributes, ComponentProps, DetailedHTMLProps } from "react";

import Icon from "../../Icon";

type ButtonProps = {
  iconSrc?: ComponentProps<typeof Icon>["iconSrc"];
  buttonType?: "primary" | "secondary";
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function Button({ buttonType, iconSrc, ...props }: ButtonProps) {
  function renderButton(type: typeof buttonType) {
    if (type === "secondary") {
      return (
        <button type="button" className="btn btn-secondary" {...props}>
          <Icon iconSrc={iconSrc || "prevButton"} id="btn-secondary-icon" />
          {props.children}
        </button>
      );
    } else {
      return (
        <button type="button" className="btn btn-primary" {...props}>
          {props.children}
        </button>
      );
    }
  }

  return renderButton(buttonType);
}

export default Button;
