import { FC } from "react";
import css from "./menu.module.scss";
import Container from "../container";
// import MoveFolderFolder from "./folder";

type Props = {
};

const ActionMenu: FC<Props> = () => {
  const handleFolderSelect = async (folderId: string) => {

  };

  // const renderFolders = folders.map((folder) => {
  //   return (
  //     <MoveFolderFolder
  //       key={folder.id}
  //       folder={folder}
  //       onClick={handleFolderSelect}
  //     />
  //   );
  // });

  return (
    <Container unclickable className={css.root}>
      <div className={css.header}>Move to folder</div>
      {/* <div className={css.folders}>{renderFolders}</div> */}
    </Container>
  );
};

export default ActionMenu;
