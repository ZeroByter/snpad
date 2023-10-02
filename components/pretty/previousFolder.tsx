import { FC } from "react";
import css from "./previousFolder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faLock } from "@fortawesome/free-solid-svg-icons";
import Container from "./shared/container";
import { useSSRFetcher } from "../contexts/ssrFetcher";
import ConditionalLink from "./shared/conditionalLink";

type Props = {
  disabled: boolean;
  folderId: string;
};

const PreviousFolder: FC<Props> = ({ disabled, folderId }) => {
  return (
    <ConditionalLink
      disabled={disabled}
      href={folderId ? `/folder/${folderId}` : "/"}
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
