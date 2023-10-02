import { FC } from "react";
import { ClientFolder } from "../../clientlib/types/folder";
import { ClientText } from "../../clientlib/types/text";
import Folder from "./folder";
import Text from "./text";
import css from "./loggedIn.module.scss";
import Button from "./shared/button";
import Link from "next/link";
import { useRouter } from "next/router";
import PreviousFolder from "./previousFolder";
import { useSSRFetcher } from "../contexts/ssrFetcher";

type Props = {
  texts: ClientText[];
  folders: ClientFolder[];
};

const LoggedIn: FC<Props> = ({ texts, folders }) => {
  const { props } = useSSRFetcher();

  const router = useRouter();

  const renderTexts = texts?.map((text: ClientText) => {
    return <Text key={text.id} text={text} />;
  });

  const renderFolders = folders?.map((folder: ClientFolder) => {
    return <Folder key={folder.id} folder={folder} />;
  });

  let newTextUrl = "/newText";
  if (router.query.id) {
    newTextUrl = `/newText#${router.query.id}`;
  }

  return (
    <div className={css.root}>
      <div className={css.buttons}>
        <Link href={newTextUrl} passHref>
          <Button>New text</Button>
        </Link>
        <Button>New folder</Button>
      </div>
      <div className={css.previousFolder}>
        <PreviousFolder
          disabled={props.parentFolderId === undefined}
          folderId={props.parentFolderId}
        />
      </div>
      {renderFolders?.length > 0 && (
        <div className={css.folders}>{renderFolders}</div>
      )}
      <div className={css.texts}>{renderTexts}</div>
    </div>
  );
};

export default LoggedIn;
