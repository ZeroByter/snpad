import { FC } from "react";
import { ClientFolder } from "../../clientlib/types/folder";
import { ClientText } from "../../clientlib/types/text";
import Folder from "./folder";
import Text from "./text";
import css from "./loggedIn.module.scss";

type Props = {
  texts: ClientText[];
  folders: ClientFolder[];
};

const LoggedIn: FC<Props> = ({ texts, folders }) => {
  const renderTexts = texts.map((text: ClientText) => {
    return <Text key={text.id} text={text} />;
  });

  const renderFolders = folders.map((folder: ClientFolder) => {
    return <Folder key={folder.id} folder={folder} />;
  });

  return (
    <div className={css.root}>
      <div className={css.folders}>{renderFolders}</div>
      <div className={css.texts}>{renderTexts}</div>
    </div>
  );
};

export default LoggedIn;
