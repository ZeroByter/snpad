import classNames from "classnames";
import css from "./button.module.scss";
import containerCss from "./container.module.scss";

const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = (props) => {
  return (
    <button className={classNames(containerCss.root, css.root)} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
