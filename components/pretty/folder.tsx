import Link from "next/link";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
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
  const [folderState, setFolderState] = useState(folder);
  const [decryptedTitle, setDecryptedTitle] = useState(null);

  const actionMenuRef = useRef();

  let renderTitle;
  let renderIcon;

  useEffect(() => {
    setFolderState(folder);
  }, [folder]);

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (
      !isElementInsideTarget(e.target as HTMLElement, actionMenuRef.current)
    ) {
      Router.push(`/folder/${folder.id}`);
    }
  };

  let lockedIcon = false;

  if (folderState.titleencrypted) {
    if (decryptedTitle) {
      renderTitle = decryptedTitle;
    } else {
      renderTitle = folderState.titlehint;
      lockedIcon = true;
    }
  } else {
    renderTitle = folderState.title;
  }

  if (lockedIcon) {
    renderIcon = (
      <div className={classNames(css.icon, css.lockedFolder)}>
        <FontAwesomeIcon icon={faFolder} />
        <FontAwesomeIcon icon={faLock} />
      </div>
    );
  } else {
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
            itemId={folderState.id}
            parentId={folderState.folderid}
          />
          <DecryptTitleAction
            folder={folderState}
            enable={folderState.titleencrypted && !decryptedTitle}
            setDecryptedTitle={setDecryptedTitle}
          />
          <RenameFolderAction
            existingFolder={folderState}
            setFolderState={setFolderState}
          />
          <DeleteFolderAction folder={folderState} />
        </>
      </ActionMenu>
    </Container>
  );
};

export default Folder;
