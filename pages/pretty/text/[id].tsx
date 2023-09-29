import { FC, useState } from "react";
import css from "./text.module.scss";
import textAreaCss from "@/components/pretty/shared/container.module.scss";
import Input from "@/components/pretty/shared/input";
import Container from "@/components/pretty/shared/container";
import Header from "@/components/pretty/header";
import { getLoginSession } from "../../../serverlib/auth";
import UsersSQL from "../../../serverlib/sql-classes/users";
import classNames from "classnames";
import { sanitize } from "isomorphic-dompurify";

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
      <div className={css.root}>
        <Container>switch to edit view</Container>
        <div className={css.titleContainer}>
          <Input className={css.input} placeholder="Title" readOnly />
        </div>
        <div className={css.textInputsContainer}>
          <div
            className={classNames(
              css.textInputContainer,
              textAreaCss.rootNoPadding
            )}
          >
            <div
              className={css.markdownPreview}
              dangerouslySetInnerHTML={{
                __html: sanitize("hello world"),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTextPage;
