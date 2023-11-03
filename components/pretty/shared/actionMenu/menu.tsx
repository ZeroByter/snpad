import { FC, ReactElement } from "react";
import css from "./menu.module.scss";
import Container from "../container";

type Props = {
  children: ReactElement;
};

const ActionMenu: FC<Props> = ({ children }) => {
  return (
    <Container unclickable className={css.root}>
      {children}
    </Container>
  );
};

export default ActionMenu;
