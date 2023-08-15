import classNames from "classnames";
import css from "./input.module.scss";
import containerCss from "./container.module.scss";

const Input: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = (props) => {
  return (
    <input
      {...props}
      className={classNames(
        containerCss.rootNoPadding,
        css.root,
        props.className
      )}
    />
  );
};

export default Input;
