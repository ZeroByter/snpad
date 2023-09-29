import { forwardRef } from "react";
import css from "./container.module.scss";

type Props = {
  static?: boolean;
};

const Container: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    Props
> = forwardRef(function Container(props, ref) {
  return (
    <div
      className={css.root}
      {...props}
      ref={ref}
      data-static={props.static ?? false}
    >
      {props.children}
    </div>
  );
});

export default Container;
