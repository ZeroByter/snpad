import Link from "next/link";
import { FC, MouseEvent, useRef } from "react";
import { ClientFolder } from "../../clientlib/types/folder";
import css from "./folder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faLock } from "@fortawesome/free-solid-svg-icons";
import Container from "./shared/container";
import classNames from "classnames";
import MoveFolder from "./shared/folderActions/moveFolder";
import Router from "next/router";
import { isElementInsideTarget } from "@/clientlib/essentials";
import ActionMenu from "./shared/actionMenu";
import RenameFolderAction from "./shared/folderActions/renameFolder";
import DeleteFolderAction from "./shared/folderActions/deleteFolder";
import DecryptTitleAction from "./shared/folderActions/decryptTitle";

type Props = {
  folder: ClientFolder;
};

const Folder: FC<Props> = ({ folder }) => {
  const actionMenuRef = useRef();

  let renderTitle;
  let renderIcon;

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (
      !isElementInsideTarget(e.target as HTMLElement, actionMenuRef.current)
    ) {
      Router.push(`/folder/${folder.id}`);
    }
  };

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
    <Container className={css.containerRoot} onClick={handleContainerClick}>
      <div className={css.root}>
        {renderIcon}
        {renderTitle}
      </div>
      <ActionMenu ref={actionMenuRef}>
        <>
          <MoveFolder
            isText={false}
            itemId={folder.id}
            parentId={folder.folderid}
          />
          <DecryptTitleAction enable={folder.titleencrypted} />
          <RenameFolderAction />
          <DeleteFolderAction />
        </>
      </ActionMenu>
    </Container>
  );
};

export default Folder;
