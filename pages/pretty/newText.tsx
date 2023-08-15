import { FC } from "react";
import css from "./newText.module.scss";
import Input from "../../components/pretty/shared/input";
import TextArea from "../../components/pretty/shared/textarea";
import Button from "../../components/pretty/shared/button";

const NewTextPage: FC = () => {
  return (
    <div className={css.root}>
      <div>
        <Input className={css.input} placeholder="test" />
      </div>
      <div className={css.textInputsContainer}>
        <div className={css.textInputContainer}>
          <TextArea className={css.textarea} />
        </div>
        <div className={css.textInputContainer}>
          <TextArea className={css.textarea} readOnly />
        </div>
      </div>
      <div>
        <Input className={css.input} placeholder="password" />
      </div>
      <div>
        <Button>Create</Button>
      </div>
    </div>
  );
};

export default NewTextPage;
