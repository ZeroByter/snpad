import { forwardRef } from "react";
import css from "./container.module.scss";

const Container: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = forwardRef(function Container(props, ref) {
  return (
    <div className={css.root} {...props} ref={ref}>
      {props.children}
    </div>
  );
});

export default Container;
