import { FC } from "react";
import Container from "../container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  text: string;
  icon: IconDefinition;
  onClick: VoidFunction;
  enable?: boolean;
};

const ActionMenuItem: FC<Props> = ({ text, icon, onClick, enable }) => {
  // TOOD: if enable is false, make container half opacity and blocked cursor and unclickable

  return (
    <Container onClick={() => onClick()} unclickable={!enable}>
      <div>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>{text}</div>
    </Container>
  );
};

export default ActionMenuItem;
