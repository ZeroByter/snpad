import { FC } from "react";
import Modal from "../modal";
import Input from "../input";
import Button from "../button";
import css from "./newFolder.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { randomId } from "@/sharedlib/essentials";
import CryptoJS from "crypto-js";
import { ClientFolder } from "@/clientlib/types/folder";
import { useRouter } from "next/router";

type Inputs = {
  title: string;
  titleHint: string;
  titlePassword: string;
};

type Props = {
  onSuccess: (
    title: string,
    titleHint: string,
    newFoldersList: ClientFolder[]
  ) => void;
  onBackdropClick: VoidFunction;
  existingFolder?: ClientFolder;
};

const NewFolderModal: FC<Props> = ({
  onBackdropClick,
  existingFolder,
  onSuccess,
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const watchTitle = watch("title");
  const watchTitleHint = watch("titleHint");
  const watchTitlePassword = watch("titlePassword");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let finalTitle;

    if (data.titleHint) {
      const randomValue = randomId(5);
      finalTitle = CryptoJS.AES.encrypt(
        randomValue + data.title + randomValue,
        data.titlePassword
      ).toString();
    } else {
      finalTitle = data.title;
    }

    let newFoldersList = [];

    if (existingFolder != null) {
      await fetch("/api/folders/rename", {
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: existingFolder.id,
          title: finalTitle,
          titleHint: data.titleHint,
          encryptTitle: !!data.titleHint,
        }),
        method: "POST",
      });
    } else {
      const rawResponse = await fetch("/api/folders/create", {
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          parent: router.query.id,
          title: finalTitle,
          titleHint: data.titleHint,
          encryptTitle: !!data.titleHint,
        }),
        method: "POST",
      });
      const response = await rawResponse.json();

      if (response.error == null) {
        newFoldersList = response.folders;
      }
    }

    onSuccess(finalTitle, data.titleHint, newFoldersList);
    onBackdropClick();
  };

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <form className={css.root} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.title}>
          {existingFolder ? "Rename" : "New"} folder
        </div>
        <div>
          <Input
            {...register("title")}
            className={css.input}
            placeholder="Title"
            required
          />
        </div>
        <div>
          <Input
            {...register("titleHint")}
            className={css.input}
            placeholder="Encrypted title hint"
            required={!!watchTitlePassword}
          />
        </div>
        <div>
          <Input
            {...register("titlePassword")}
            className={css.input}
            placeholder="Encrypted title password"
            type="password"
            required={!!watchTitleHint}
          />
        </div>
        {watchTitle && (
          <div>
            New title: {watchTitle}{" "}
            {watchTitleHint ? "(encrypted)" : "(unencrypted)"}
          </div>
        )}
        {watchTitleHint && <div>New title hint: {watchTitleHint}</div>}
        <div className={css.buttons}>
          <Button type="submit">{existingFolder ? "Rename" : "Create"}</Button>
          <Button type="reset" onClick={onBackdropClick}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewFolderModal;
