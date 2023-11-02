import { FC } from "react"
import ActionMenuItem from "../actionMenu/item"
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons"

type Props = {
  enable: boolean;
}

const DecryptTitleAction: FC<Props> = ({ enable }) => {
  return (
    <div>
      <ActionMenuItem enable={enable} text="Decrypt title" icon={faFolderOpen} onClick={() => { }} />
    </div>
  )
}

export default DecryptTitleAction