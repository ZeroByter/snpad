import { FC, MouseEvent } from "react"
import css from "./button.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

type Props = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ActionMenuButton: FC<Props> = ({ onClick }) => {
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick(e)
  }

  return <button className={css.root} onClick={handleOnClick}><FontAwesomeIcon icon={faBars} fontSize={10} /></button>
}

export default ActionMenuButton