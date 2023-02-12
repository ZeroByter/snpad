import { FC } from "react";
import { useRouter } from "next/router";
import css from "./styles.module.scss";

type Props = {
  children?: JSX.Element;
};

const PrettyStyles: FC<Props> = ({ children }) => {
  const router = useRouter();

  if (
    typeof document !== "undefined" &&
    router.pathname.startsWith("/pretty")
  ) {
    document.body.setAttribute("data-pretty", "true");
  }

  return children;
};

export default PrettyStyles;
