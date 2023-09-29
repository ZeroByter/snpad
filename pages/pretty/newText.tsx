import { FC, useEffect, useState } from "react";
import Router from "next/router";
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
import PasswordInput from "@/components/pretty/passwordInput";
import { randomId } from "sharedlib/essentials";
import CryptoJS from "crypto-js";

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
  const [message, setMessage] = useState("");
  const watchTitleHint = watch("titleHint");
  const watchText = watch("text");

  const isTitleEncrypted = watchTitleHint != null && watchTitleHint.length > 0;

  const onSubmit = handleSubmit(async (data: FormData) => {
    const randomValue = randomId(5);
    const encryptedText = CryptoJS.AES.encrypt(
      randomValue + data.text + randomValue,
      data.password
    ).toString();
    let title;
    if (isTitleEncrypted) {
      title = CryptoJS.AES.encrypt(data.title, data.password).toString();
    } else {
      title = data.title;
    }

    let folderId = window.location.hash.slice(1);
    if (folderId == "") {
      folderId = null;
    }

    const rawResponse = await fetch("/api/texts/create", {
      headers: {},
      body: JSON.stringify({
        folderId: folderId,

        title,
        titleHint: data.titleHint,
        encryptTitle: isTitleEncrypted,

        data: encryptedText,
      }),
      method: "POST",
    });
    const response = await rawResponse.json();

    if (response.error == null) {
      Router.replace("/pretty/text/" + response.newId + "#" + data.password);
    } else {
      setMessage(response.error);
    }
  });

  const renderTitleHelp = () => {
    return (
      <Container unclickable>
        {isTitleEncrypted
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
            data-unclickable="false"
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
          <PasswordInput register={register("password")} />
        </div>
        {message && <div>{message}</div>}
        <div>
          <Button>Create</Button>
        </div>
      </form>
    </div>
  );
};

export default NewTextPage;
