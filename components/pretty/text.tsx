import Link from "next/link";
import { FC, MouseEvent, useRef } from "react";
import { ClientText } from "../../clientlib/types/text";
import css from "./text.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faLock } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import MoveFolder from "./shared/moveFolder";
import { isElementInsideTarget } from "@/clientlib/essentials";
import Router from "next/router";
import { useSSRFetcher } from "../contexts/ssrFetcher";
import ActionMenu from "./shared/actionMenu";

type Props = {
  text: ClientText;
};

const Text: FC<Props> = ({ text }) => {
  const ssrFetcher = useSSRFetcher();

  const actionMenuRef = useRef();

  let renderTitle;
  let renderIcon;

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (
      !isElementInsideTarget(e.target as HTMLElement, actionMenuRef.current)
    ) {
      Router.push(`/text/${text.id}`);
    }
  };

  if (text.titleencrypted) {
    renderTitle = text.titlehint;
    renderIcon = (
      <div className={classNames(css.icon, css.lockedText)}>
        <FontAwesomeIcon icon={faFile} />
        <FontAwesomeIcon icon={faLock} />
      </div>
    );
  } else {
    renderTitle = text.title;
    renderIcon = (
      <div className={css.icon}>
        <FontAwesomeIcon icon={faFile} />
      </div>
    );
  }

  return (
    <div className={css.root} onClick={handleContainerClick}>
      {renderIcon}
      {renderTitle}
      <ActionMenu ref={actionMenuRef}>
        <MoveFolder
          isText={true}
          itemId={text.id}
          parentId={ssrFetcher.props.folderId}
        />
      </ActionMenu>
    </div>
  );
};

export default Text;
