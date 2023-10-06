import { FC } from "react";
import Container from "../container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { ClientSearchedFolder } from "@/clientlib/types/searchedFolder";

type Props = {
  folder: ClientSearchedFolder;
  onClick: (folderId: string) => void;
};

const MoveFolderFolder: FC<Props> = ({ folder, onClick }) => {
  return (
    <Container onClick={() => onClick(folder.id)}>
      <div>
        <FontAwesomeIcon icon={faFolder} />
      </div>
      <div>{folder.title}</div>
    </Container>
  );
};

export default MoveFolderFolder;
