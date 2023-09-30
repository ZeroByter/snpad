import { FC, useState } from "react";
import css from "./decrypted.module.scss";
import Container from "../../../shared/container";
import ViewMode from "./viewMode";
import EditMode from "./editMode";

type Props = {
  readOnly: boolean;
  id: string;
  text: string;
  title: string;
  titleHint: string;
  password: string;
};

const Decrypted: FC<Props> = ({
  readOnly,
  id,
  text,
  title,
  titleHint,
  password,
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleFinishEdit = () => {
    setEditMode(false);
  };

  return (
    <div className={css.root}>
      <div className={css.container}>
        {!readOnly && (
          <Container onClick={handleToggleEditMode}>
            {`Switch to ${editMode ? "view" : "edit"} mode`}
          </Container>
        )}
        {(!editMode || readOnly) && <ViewMode title={title} text={text} />}
        {editMode && !readOnly && (
          <EditMode
            id={id}
            defaultTitle={title}
            defaultTitleHint={titleHint}
            defaultText={text}
            defaultPassword={password}
            onFinishEdit={handleFinishEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Decrypted;
