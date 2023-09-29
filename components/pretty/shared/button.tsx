import classNames from "classnames";
import css from "./button.module.scss";
import containerCss from "./container.module.scss";
import { forwardRef } from "react";

const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = forwardRef(function Button(props, ref) {
  return (
    <button
      data-unclickable="false"
      {...props}
      className={classNames(containerCss.root, css.root, props.className)}
      ref={ref}
    >
      {props.children}
    </button>
  );
});

export default Button;
