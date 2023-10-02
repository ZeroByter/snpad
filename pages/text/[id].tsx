import { FC, useEffect, useState } from "react";
import { getLoginSession } from "@/serverlib/auth";
import UsersSQL from "@/serverlib/sql-classes/users";
import Encrypted from "@/components/pretty/texts/viewText/encrypted";
import Header from "@/components/pretty/header";
import css from "./text.module.scss";
import TextsSQL from "serverlib/sql-classes/texts";
import attemptDecrypt from "@/clientlib/attempt-decrypt";
import Decrypted from "@/components/pretty/texts/viewText/decrypted/decrypted";
import ViewTextProvider, { useViewText } from "@/components/contexts/viewText";

export async function getServerSideProps(context) {
  const { id } = context.query;

  const text = await TextsSQL.getById(id);
  let readOnly = true;

  if (text == null) {
    return {
      notFound: true,
    };
  }

  const session = await getLoginSession(context.req);

  let username = null;

  if (session?.id != null) {
    const account = await UsersSQL.getById(session.id);
    username = account.username;
    readOnly = text.userid != session.id;
  }

  return {
    props: {
      username,
      id,
      rawData: text.data,
      rawTitle: text.title,
      titleHint: text.titlehint,
      titleEncrypted: text.titleencrypted,
      parentId: text.folderid,
      readOnly,
    },
  };
}

type Props = {
  username: string;
  id: string;
  rawData: string;
  rawTitle: string;
  titleHint: string;
  titleEncrypted: boolean;
  readOnly: boolean;
};

const NewTextPage: FC<Props> = ({
  username,
  id,
  rawData,
  rawTitle,
  titleHint,
  titleEncrypted,
  readOnly,
}) => {
  const [incorrectDefaultPassword, setIncorrectDefaultPassword] =
    useState(false);

  const [decrypted, setDecrypted] = useState(false);
  const { setTitle, setTitleHint, setText, setPassword } = useViewText();

  useEffect(() => {
    if (window.location.hash.length != 0) {
      let defaultPassword = window.location.hash.slice(1);

      var decryptedData = attemptDecrypt(
        defaultPassword,
        rawData,
        titleEncrypted,
        rawTitle
      );

      if (decryptedData != null) {
        handleDecrypted(
          decryptedData.decryptedText,
          decryptedData.title,
          defaultPassword
        );
      } else {
        setIncorrectDefaultPassword(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDecrypted = (newText, newTitle, password) => {
    setText(newText);
    setTitle(newTitle);
    setTitleHint(titleHint);

    setPassword(password);
    setDecrypted(true);
  };

  return (
    <div className={css.pageRoot}>
      <Header username={username} />
      <div className={css.root}>
        {!decrypted && (
          <Encrypted
            rawData={rawData}
            rawTitle={rawTitle}
            titleEncrypted={titleEncrypted}
            incorrectDefaultPassword={incorrectDefaultPassword}
            onDecrypted={handleDecrypted}
          />
        )}
        {decrypted && <Decrypted id={id} readOnly={readOnly} />}
      </div>
    </div>
  );
};

const NewTextPageWrapper: FC<Props> = (props) => {
  return (
    <ViewTextProvider>
      <NewTextPage {...props} />
    </ViewTextProvider>
  );
};

export default NewTextPageWrapper;
