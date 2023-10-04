import { FC } from "react"
import Container from "../container"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"

const MoveFolderFolder: FC = () => {
  return <Container>
    <div><FontAwesomeIcon icon={faFolder} /></div>
    <div>meme</div>
  </Container>
}

export default MoveFolderFolder