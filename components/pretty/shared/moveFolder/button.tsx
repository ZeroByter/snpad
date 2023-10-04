import { FC, MouseEvent } from "react"
import css from "./button.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons"

type Props = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const MoveFolderButton: FC<Props> = ({ onClick }) => {
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick(e)
  }

  return <button className={css.root} onClick={handleOnClick}><FontAwesomeIcon icon={faFolderOpen} fontSize={10} /></button>
}

export default MoveFolderButton