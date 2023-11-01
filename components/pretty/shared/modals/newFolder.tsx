import { FC } from "react"
import Modal from "../modal"

type Props = {
  onBackdropClick: VoidFunction;
}

const NewFolderModal: FC<Props> = ({ onBackdropClick }) => {
  return (
    <Modal onBackdropClick={onBackdropClick}>
      <>
        <div>New folder</div>
        <div>title</div>
        <div>encrypt title</div>
        <div>cancel button | create button</div>
      </>
    </Modal>
  )
}

export default NewFolderModal