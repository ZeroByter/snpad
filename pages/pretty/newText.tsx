import { FC, useEffect, useState } from "react";
import css from "./newText.module.scss";
import textAreaCss from "@/components/pretty/shared/container.module.scss";
import Input from "../../components/pretty/shared/input";
import TextArea from "../../components/pretty/shared/textarea";
import Button from "../../components/pretty/shared/button";
import Container from "../../components/pretty/shared/container";
import { useForm } from "react-hook-form";
import Header from "../../components/pretty/header";
import { getLoginSession } from "../../serverlib/auth";
import UsersSQL from "../../serverlib/sql-classes/users";
import { marked } from "marked";
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

type FormData = {
  title: string;
  titleHint?: string;
  text: string;
  password: string;
};

const NewTextPage: FC<Props> = ({ username }) => {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const [markdownPreview, setMarkdownPreview] = useState("");
  const watchTitleHint = watch("titleHint");
  const watchText = watch("text");

  const onSubmit = handleSubmit((data) => {});

  const renderTitleHelp = () => {
    return (
      <Container>
        {watchTitleHint && watchTitleHint.length > 0
          ? `Your title is encrypted, hint: '${watchTitleHint}'`
          : "Your title is unencrypted"}
      </Container>
    );
  };

  useEffect(() => {
    setMarkdownPreview(marked.parse(watchText ?? ""));
  }, [watchText]);

  return (
    <div className={css.pageRoot}>
      <Header username={username} />
      <form className={css.root} onSubmit={onSubmit}>
        {renderTitleHelp()}
        <div className={css.titleContainer}>
          <Input
            {...register("title")}
            required
            className={css.input}
            placeholder="Title"
          />
          <Input
            {...register("titleHint")}
            className={css.input}
            placeholder="Encrypted title hint"
          />
        </div>
        <div className={css.textInputsContainer}>
          <div className={css.textInputContainer}>
            <TextArea
              {...register("text")}
              className={css.textarea}
              placeholder="Enter your text here..."
              required
            />
          </div>
          <div
            className={classNames(
              css.textInputContainer,
              textAreaCss.rootNoPadding
            )}
          >
            <div
              className={css.markdownPreview}
              dangerouslySetInnerHTML={{
                __html: sanitize(markdownPreview),
              }}
            ></div>
          </div>
        </div>
        <div className={css.passwordContainer}>
          <Input
            {...register("password")}
            required
            className={css.input}
            placeholder="Password"
          />
          <Button>Show password</Button>
        </div>
        <div>
          <Button>Create</Button>
        </div>
      </form>
    </div>
  );
};

export default NewTextPage;
