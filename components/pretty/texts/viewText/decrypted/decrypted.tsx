import { FC, useState } from "react";
import css from "./decrypted.module.scss";
import Container from "../../../shared/container";
import ViewMode from "./viewMode";
import EditMode from "./editMode";
import { useViewText } from "@/components/contexts/viewText";

type Props = {
  readOnly: boolean;
  id: string;
};

const Decrypted: FC<Props> = ({ readOnly, id }) => {
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
        {(!editMode || readOnly) && <ViewMode />}
        {editMode && !readOnly && (
          <EditMode id={id} onFinishEdit={handleFinishEdit} />
        )}
      </div>
    </div>
  );
};

export default Decrypted;
