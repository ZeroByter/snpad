import Link from "next/link";
import { FC } from "react";
import { ClientText } from "../../clientlib/types/text";
import css from "./text.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faLock } from "@fortawesome/free-solid-svg-icons";
import mergeClassNames from "merge-class-names";

type Props = {
  text: ClientText;
};

const Text: FC<Props> = ({ text }) => {
  let renderTitle;
  let renderIcon;

  if (text.titleencrypted) {
    renderTitle = text.titlehint;
    renderIcon = (
      <div className={mergeClassNames(css.icon, css.lockedText)}>
        <FontAwesomeIcon icon={faLock} />
        <FontAwesomeIcon icon={faFile} />
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
    <Link href={`/pretty/text/${text.id}`} passHref>
      <div className={css.root}>
        {renderIcon}
        {renderTitle}
      </div>
    </Link>
  );
};

export default Text;
