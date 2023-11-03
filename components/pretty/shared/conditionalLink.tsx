import Link, { LinkProps } from "next/link";
import { FC, PropsWithChildren, ReactElement } from "react";

type Props = {
  children: ReactElement;
  disabled: boolean;
};

const ConditionalLink: FC<PropsWithChildren<LinkProps> & Props> = (props) => {
  const { children, disabled, ...linkProps } = props;

  if (disabled) {
    return children;
  } else {
    return <Link {...linkProps}>{children}</Link>;
  }
};

export default ConditionalLink;
