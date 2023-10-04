import { FC } from "react"
import css from "./menu.module.scss"
import Container from "../container"
import Input from "../input"
import MoveFolderFolder from "./folder"

const MoveFolderMenu: FC = () => {
  return <Container unclickable className={css.root}>
    <div className={css.header}>Move to folder</div>
    <div className={css.searchContainer}>
      <Input className={css.search} type="search" placeholder="Search folder" />
    </div>
    <div className={css.folders}>
      <MoveFolderFolder />
      <MoveFolderFolder />
      <MoveFolderFolder />
    </div>
  </Container>
}

export default MoveFolderMenu