import { FC, ForwardedRef, forwardRef, useState } from "react";
import MoveFolderButton from "./button";
import css from "./index.module.scss";
import MoveFolderMenu from "./menu";

type Props = {
  ref: ForwardedRef<HTMLDivElement>;
};

const MoveFolder: FC<Props> = forwardRef(function MoveFolder(props, ref) {
  const [showMenu, setShowMenu] = useState(false);

  const handleButtonClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  return (
    <div ref={ref} className={css.root} onMouseLeave={handleMouseLeave}>
      <MoveFolderButton onClick={handleButtonClick} />
      {showMenu && <MoveFolderMenu />}
    </div>
  );
});

export default MoveFolder;
