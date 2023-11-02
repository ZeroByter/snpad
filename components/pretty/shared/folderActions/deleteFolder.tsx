import { FC } from "react"
import ActionMenuItem from "../actionMenu/item"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

const DeleteFolderAction: FC = () => {
  return (
    <div>
      <ActionMenuItem text="Delete" icon={faTrashCan} onClick={() => { }} />
    </div>
  )
}

export default DeleteFolderAction