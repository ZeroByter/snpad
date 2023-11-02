import { FC } from "react"
import ActionMenuItem from "../actionMenu/item"
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons"

const RenameFolderAction: FC = () => {
  return (
    <div>
      <ActionMenuItem text="Rename" icon={faFolderOpen} onClick={() => { }} />
    </div>
  )
}

export default RenameFolderAction