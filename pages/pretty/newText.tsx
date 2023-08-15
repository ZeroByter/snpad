import { FC } from "react";
import css from "./newText.module.scss";
import Input from "../../components/pretty/shared/input";
import TextArea from "../../components/pretty/shared/textarea";
import Button from "../../components/pretty/shared/button";
import Container from "../../components/pretty/shared/container";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  titleHint?: string;
  text: string;
  password: string;
};

const NewTextPage: FC = () => {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const watchTitleHint = watch("titleHint");

  const onSubmit = handleSubmit((data) => {});

  const renderTitleHelp = () => {
    console.log(watchTitleHint);

    return (
      <Container>
        {watchTitleHint && watchTitleHint.length > 0
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
        <div className={css.textInputContainer}>
          <TextArea
            className={css.textarea}
            readOnly
            placeholder="Markdown preview"
          />
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
  );
};

export default NewTextPage;
