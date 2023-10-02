import { FC } from "react";
import css from "./previousFolder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faLock } from "@fortawesome/free-solid-svg-icons";
import Container from "./shared/container";
import { useSSRFetcher } from "../contexts/ssrFetcher";
import ConditionalLink from "./shared/conditionalLink";

type Props = {};

const PreviousFolder: FC<Props> = ({}) => {
  const { props } = useSSRFetcher();

  const disabled = props.parentFolderId === undefined;

  return (
    <ConditionalLink
      disabled={disabled}
      href={props.parentFolderId ? `/folder/${props.parentFolderId}` : "/"}
      passHref
    >
      <Container
        noPadding
        unclickable={disabled}
        className={css.root}
        data-disabled={disabled}
      >
        <div className={css.icon}>
          <FontAwesomeIcon icon={faFolder} />
        </div>
        <div>Previous</div>
      </Container>
    </ConditionalLink>
  );
};

export default PreviousFolder;
