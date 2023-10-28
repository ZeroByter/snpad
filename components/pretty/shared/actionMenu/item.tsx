import { FC } from "react";
import Container from "../container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  text: string;
  icon: IconDefinition;
  onClick: VoidFunction;
};

const ActionMenuItem: FC<Props> = ({ text, icon, onClick }) => {
  return (
    <Container onClick={() => onClick()}>
      <div>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>{text}</div>
    </Container>
  );
};

export default ActionMenuItem;
