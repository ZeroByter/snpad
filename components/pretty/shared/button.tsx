import classNames from "classnames";
import css from "./button.module.scss";
import containerCss from "./container.module.scss";
import { forwardRef } from "react";

type Props = {
  theme?: "normal" | "danger";
};

const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    Props
> = forwardRef(function Button(props, ref) {
  const { theme, ...restProps } = props;

  return (
    <button
      data-unclickable="false"
      data-theme={theme ?? "normal"}
      {...restProps}
      className={classNames(containerCss.root, css.root, restProps.className)}
      ref={ref}
    >
      {restProps.children}
    </button>
  );
});

export default Button;
