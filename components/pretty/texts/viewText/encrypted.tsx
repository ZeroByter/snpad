import { FC } from "react";
import css from "./encrypted.module.scss";
import Container from "../../shared/container";

const Encrypted: FC = () => {
  return (
    <div className={css.root}>
      <Container static>test</Container>
    </div>
  );
};

export default Encrypted;
