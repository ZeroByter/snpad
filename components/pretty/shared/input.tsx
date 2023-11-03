import classNames from "classnames";
import css from "./input.module.scss";
import containerCss from "./container.module.scss";
import { forwardRef } from "react";

const Input: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = forwardRef(function Input(props, ref) {
  return (
    <input
      {...props}
      ref={ref}
      data-unclickable={props.readOnly ?? false}
      className={classNames(
        containerCss.rootNoPadding,
        css.root,
        props.className
      )}
    />
  );
});

export default Input;
