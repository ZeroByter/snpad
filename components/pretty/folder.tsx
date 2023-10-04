import Link from "next/link";
import { FC, MouseEvent } from "react";
import { ClientFolder } from "../../clientlib/types/folder";
import css from "./folder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faLock } from "@fortawesome/free-solid-svg-icons";
import Container from "./shared/container";
import classNames from "classnames";
import MoveFolder from "./shared/moveFolder";
import Router from "next/router";
import { isElementUnderElement } from "@/clientlib/essentials";

type Props = {
  folder: ClientFolder;
};

const Folder: FC<Props> = ({ folder }) => {
  let renderTitle;
  let renderIcon;

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    console.log(isElementUnderElement(e.target, e.currentTarget))
    //Router.push(`/folder/${folder.id}`)
  }

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
      <MoveFolder />
    </Container>
  );
};

export default Folder;
