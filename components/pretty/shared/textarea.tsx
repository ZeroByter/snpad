import classNames from "classnames";
import css from "./textarea.module.scss";
import containerCss from "./container.module.scss";
import { forwardRef } from "react";

const TextArea: React.FC<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
> = forwardRef(function TextArea(props, ref) {
  return (
    <textarea
      {...props}
      ref={ref}
      data-unclickable="false"
      className={classNames(
        containerCss.rootNoPadding,
        css.root,
        props.className
      )}
    >
      {props.children}
    </textarea>
  );
});

export default TextArea;
