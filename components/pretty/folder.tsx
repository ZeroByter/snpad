import Link from "next/link";
import { FC } from "react";
import { ClientFolder } from "../../clientlib/types/folder";
import css from "./folder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faLock } from "@fortawesome/free-solid-svg-icons";
import Container from "./shared/container";
import classNames from "classnames";

type Props = {
  folder: ClientFolder;
};

const Folder: FC<Props> = ({ folder }) => {
  let renderTitle;
  let renderIcon;

  if (folder.titleencrypted) {
    renderTitle = folder.titlehint;
    renderIcon = (
      <div className={classNames(css.icon, css.lockedFolder)}>
        <FontAwesomeIcon icon={faFolder} />
        <FontAwesomeIcon icon={faLock} />
      </div>
    );
  } else {
    renderTitle = folder.title;
    renderIcon = (
      <div className={css.icon}>
        <FontAwesomeIcon icon={faFolder} />
      </div>
    );
  }

  return (
    <Link href={`/pretty/folder/${folder.id}`} passHref>
      <Container>
        <div className={css.root}>
          {renderIcon}
          {renderTitle}
        </div>
      </Container>
    </Link>
  );
};

export default Folder;
