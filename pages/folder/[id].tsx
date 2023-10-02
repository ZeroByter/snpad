import { GetServerSideProps, NextPage } from "next";
import { ClientFolder } from "../../clientlib/types/folder";
import { ClientText } from "../../clientlib/types/text";
import { useSSRFetcher } from "../../components/contexts/ssrFetcher";
import Header from "../../components/pretty/header";
import LoggedIn from "../../components/pretty/loggedIn";
import { getLoginSession } from "../../serverlib/auth";
import FoldersSQL from "../../serverlib/sql-classes/folders";
import TextsSQL from "../../serverlib/sql-classes/texts";
import UsersSQL from "../../serverlib/sql-classes/users";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getLoginSession(context.req);

  let username = null;
  let texts = null;
  let folders = null;

  let parentFolderId = null;

  if (session?.id != null) {
    const account = await UsersSQL.getById(session.id);
    username = account.username;

    texts = await TextsSQL.getAllInParent(session.id, context.query.id);
    folders = await FoldersSQL.getAllInParent(session.id, context.query.id);

    const parentFolder = await FoldersSQL.getById(context.query.id);

    if (parentFolder == null) {
      return {
        notFound: true,
      };
    }

    parentFolderId = parentFolder.folderid;
  } else {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      username,
      folders,
      texts,
      parentFolderId,
    },
  };
};

const PrettyFolder: NextPage = () => {
  const ssrFetcher = useSSRFetcher();
  const {
    username,
    texts,
    folders,
    parentFolderId,
  }: {
    username?: string;
    texts?: ClientText[];
    folders?: ClientFolder[];
    parentFolderId?: string;
  } = ssrFetcher.props;

  return (
    <>
      <Header username={username} />
      {username != null && <LoggedIn texts={texts} folders={folders} />}
    </>
  );
};

export default PrettyFolder;
