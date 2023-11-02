import { FC } from "react"
import Modal from "../modal"
import Input from "../input";
import Button from "../button";
import css from "./newFolder.module.scss"

type Props = {
  onBackdropClick: VoidFunction;
}

const NewFolderModal: FC<Props> = ({ onBackdropClick }) => {
  //TODO: Add react-form-hook here (too lazy to do it now)

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <form className={css.root}>
        <div className={css.title}>New folder</div>
        <div>
          <Input placeholder="Title" required />
        </div>
        <div>
          <Input placeholder="Encrypted title hint" />
        </div>
        <div className={css.buttons}>
          <Button type="reset">Cancel</Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  )
}

export default NewFolderModal