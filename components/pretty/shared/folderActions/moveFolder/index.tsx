import { FC, useState } from "react";
import css from "./index.module.scss";
import MoveFolderMenu from "./menu";
import ActionMenuItem from "../../actionMenu/item";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

type Props = {
  isText: boolean;
  itemId: string;
  parentId: string;
};

const MoveFolder: FC<Props> = (
  { isText, parentId, itemId }
) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleButtonClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  return (
    <div className={css.root} onMouseLeave={handleMouseLeave}>
      <ActionMenuItem text="Move to folder" icon={faFolderOpen} onClick={handleButtonClick} />
      {showMenu && (
        <MoveFolderMenu
          isText={isText}
          itemId={itemId}
          parentId={parentId}
          onMouseLeave={handleMouseLeave}
          onMoved={handleMouseLeave}
        />
      )}
    </div>
  )
};

export default MoveFolder;
