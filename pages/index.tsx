import { NextPage } from "next";
import Header from "@/components/pretty/header";
import { getLoginSession } from "@/serverlib/auth";
import FoldersSQL from "@/serverlib/sql-classes/folders";
import TextsSQL from "@/serverlib/sql-classes/texts";
import UsersSQL from "@/serverlib/sql-classes/users";
import { useSSRFetcher } from "@/components/contexts/ssrFetcher";
import { ClientFolder } from "@/clientlib/types/folder";
import { ClientText } from "@/clientlib/types/text";
import LoggedIn from "@/components/pretty/loggedIn";

export async function getServerSideProps(context) {
  const session = await getLoginSession(context.req);

  let username = null;
  let texts = null;
  let folders = null;

  if (session?.id != null) {
    const account = await UsersSQL.getById(session.id);
    username = account.username;

    texts = await TextsSQL.getAllInParent(session.id, null);
    folders = await FoldersSQL.getAllInParent(session.id, null);
  }

  return {
    props: {
      username,
      folders,
      texts,
    },
  };
}

const PrettyIndex: NextPage = () => {
  const ssrFetcher = useSSRFetcher();
  const {
    username,
    texts,
    folders,
  }: { username?: string; texts?: ClientText[]; folders?: ClientFolder[] } =
    ssrFetcher.props;

  return (
    <>
      <Header username={username} />
      {username != null && <LoggedIn texts={texts} folders={folders} />}
    </>
  );
};

export default PrettyIndex;
