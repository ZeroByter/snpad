import { FC, useState } from "react";
import { getLoginSession } from "../../../serverlib/auth";
import UsersSQL from "../../../serverlib/sql-classes/users";
import Encrypted from "@/components/pretty/texts/viewText/encrypted";
import Header from "@/components/pretty/header";
import css from "./text.module.scss";

export async function getServerSideProps(context) {
  const session = await getLoginSession(context.req);

  let username = null;

  if (session?.id != null) {
    const account = await UsersSQL.getById(session.id);
    username = account.username;
  }

  return {
    props: {
      username,
    },
  };
}

type Props = {
  username: string;
};

const NewTextPage: FC<Props> = ({ username }) => {
  const [decrypted, setDecrypted] = useState(false);

  return (
    <div className={css.pageRoot}>
      <Header username={username} />
      <div className={css.root}>{!decrypted && <Encrypted />}</div>
    </div>
  );
};

export default NewTextPage;
