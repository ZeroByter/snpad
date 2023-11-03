import { FC } from "react";
import Container from "../container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import css from "./item.module.scss";

type Props = {
  text: string;
  icon: IconDefinition;
  onClick: VoidFunction;
  enable?: boolean;
};

const ActionMenuItem: FC<Props> = ({ text, icon, onClick, enable }) => {
  const isDisabled = enable != null && !enable;

  return (
    <Container
      onClick={!isDisabled ? onClick : () => {}}
      unclickable={isDisabled}
      data-enabled={!isDisabled}
      className={css.root}
    >
      <div>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>{text}</div>
    </Container>
  );
};

export default ActionMenuItem;
