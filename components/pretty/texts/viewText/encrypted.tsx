import { FC, useState } from "react";
import css from "./encrypted.module.scss";
import Container from "../../shared/container";
import PasswordInput from "../../passwordInput";
import Button from "../../shared/button";
import { useForm } from "react-hook-form";
import attemptDecrypt from "@/clientlib/attempt-decrypt";

type Props = {
  rawData: string;
  rawTitle: string;
  titleEncrypted: boolean;
  onDecrypted: (
    decryptedText: string,
    decryptedTitle: string,
    password: string
  ) => void;
  incorrectDefaultPassword: boolean;
};

type FormData = {
  password: string;
};

const Encrypted: FC<Props> = ({
  rawData,
  rawTitle,
  titleEncrypted,
  onDecrypted,
  incorrectDefaultPassword,
}) => {
  const { register, handleSubmit } = useForm<FormData>();

  const [message, setMessage] = useState("");

  const onSubmit = handleSubmit((data: FormData) => {
    var decryptedData = attemptDecrypt(
      data.password,
      rawData,
      titleEncrypted,
      rawTitle
    );

    if (decryptedData != null) {
      onDecrypted(
        decryptedData.decryptedText,
        decryptedData.title,
        data.password
      );
    } else {
      setMessage("Wrong password, please try again");
    }
  });

  return (
    <div className={css.root}>
      <form onSubmit={onSubmit}>
        <Container unclickable className={css.container}>
          <div>Enter password to decrypt...</div>
          <div>
            <PasswordInput register={register("password")} />
          </div>
          {message && <div>{message}</div>}
          <div className={css.decryptButtonContainer}>
            <Button className={css.decryptButton}>Decrypt</Button>
          </div>
        </Container>
      </form>
    </div>
  );
};

export default Encrypted;
