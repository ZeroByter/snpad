import { FC, MouseEvent, useState } from "react"
import MoveFolderButton from "./button"
import css from "./index.module.scss"
import MoveFolderMenu from "./menu"

const MoveFolder: FC = () => {
  const [showMenu, setShowMenu] = useState(false)

  const handleButtonClick = () => {
    setShowMenu(!showMenu)
  }

  const handleMouseLeave = () => {
    setShowMenu(false)
  }

  return <div className={css.root} onMouseLeave={handleMouseLeave}>
    <MoveFolderButton onClick={handleButtonClick} />
    {showMenu && <MoveFolderMenu />}
  </div>
}

export default MoveFolder