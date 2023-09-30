import { FC, useEffect, useState } from "react";
import css from "./editMode.module.scss";
import textAreaCss from "@/components/pretty/shared/container.module.scss";
import { useForm } from "react-hook-form";
import { randomId } from "sharedlib/essentials";
import Router from "next/router";
import Input from "@/components/pretty/shared/input";
import TextArea from "@/components/pretty/shared/textarea";
import classNames from "classnames";
import { sanitize } from "isomorphic-dompurify";
import PasswordInput from "@/components/pretty/passwordInput";
import Button from "@/components/pretty/shared/button";
import Container from "@/components/pretty/shared/container";
import { parse } from "marked";
import CryptoJS from "crypto-js";

type Props = {
  id: string;
  defaultTitle: string;
  defaultTitleHint: string;
  defaultText: string;
  defaultPassword: string;
  onFinishEdit: () => void;
};

type FormData = {
  title: string;
  titleHint?: string;
  text: string;
  password: string;
};

const EditMode: FC<Props> = ({
  id,
  defaultTitle,
  defaultTitleHint,
  defaultText,
  defaultPassword,
  onFinishEdit,
}) => {
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      title: defaultTitle,
      titleHint: defaultTitleHint,
      text: defaultText,
      password: defaultPassword,
    },
  });
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

    const rawResponse = await fetch("/api/texts/update", {
      headers: {},
      body: JSON.stringify({
        id,
        data: encryptedText,
        title: title,
        titleHint: data.titleHint,
        encryptTitle: isTitleEncrypted,
      }),
      method: "POST",
    });
    const response = await rawResponse.json();

    if (response.error == null) {
      onFinishEdit();
    } else {
      setMessage(response.error);
    }
  });

  useEffect(() => {
    setMarkdownPreview(parse(watchText ?? ""));
  }, [watchText]);

  const renderTitleHelp = () => {
    return (
      <Container unclickable>
        {isTitleEncrypted
          ? `Your title is encrypted, hint: '${watchTitleHint}'`
          : "Your title is unencrypted"}
      </Container>
    );
  };

  return (
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
      <div className={css.buttons}>
        <Button type="submit">Update</Button>
        <Button type="button" theme="danger">
          Delete
        </Button>
      </div>
    </form>
  );
};

export default EditMode;
