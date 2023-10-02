import { forwardRef } from "react";
import css from "./container.module.scss";
import classNames from "classnames";

type Props = {
  unclickable?: boolean;
  noPadding?: boolean;
};

const Container: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    Props
> = forwardRef(function Container(props, ref) {
  const { unclickable, noPadding, className, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className={classNames(
        !noPadding && css.root,
        noPadding && css.rootNoPadding,
        className
      )}
      ref={ref}
      data-unclickable={unclickable ?? false}
    >
      {props.children}
    </div>
  );
});

export default Container;
