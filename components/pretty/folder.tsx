import Link from "next/link";
import { FC } from "react";
import { ClientFolder } from "../../clientlib/types/folder";
import css from "./folder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faLock } from "@fortawesome/free-solid-svg-icons";

type Props = {
  folder: ClientFolder;
};

const Folder: FC<Props> = ({ folder }) => {
  let renderTitle;
  let renderIcon;

  if (folder.titleencrypted) {
    renderTitle = folder.titlehint;
    renderIcon = (
      <div className={css.lockedFolder}>
        <FontAwesomeIcon icon={faLock} />
        <FontAwesomeIcon icon={faFolder} />
      </div>
    );
  } else {
    renderTitle = folder.title;
    renderIcon = (
      <div>
        <FontAwesomeIcon icon={faFolder} />
      </div>
    );
  }

  return (
    <Link href={`/pretty/folder/${folder.id}`} passHref>
      <div className={css.root}>
        {renderIcon}
        {renderTitle}
      </div>
    </Link>
  );
};

export default Folder;
