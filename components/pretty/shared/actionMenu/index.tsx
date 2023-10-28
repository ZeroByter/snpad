import { FC, ForwardedRef, ReactElement, createContext, forwardRef, useContext, useState } from "react";
import ActionMenuButton from "./button";
import css from "./index.module.scss";
import ActionMenuMenu from "./menu";

type Props = {
  ref: ForwardedRef<HTMLDivElement>;
  children: ReactElement;
};

type Context = {
  itemClick: VoidFunction;
};

const ActionMenuContext = createContext({} as Context);

const ActionMenu: FC<Props> = forwardRef(function ActionMenu(
  { children },
  ref
) {
  const [showMenu, setShowMenu] = useState(false);

  const handleButtonClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  const handleItemClick = () => {

  }

  const contextData = {
    itemClick: handleItemClick
  }

  return (
    <ActionMenuContext.Provider value={contextData}>
      <div ref={ref} className={css.root} onMouseLeave={handleMouseLeave}>
        <ActionMenuButton onClick={handleButtonClick} />
        {showMenu && (
          <ActionMenuMenu>
            {children}
          </ActionMenuMenu>
        )}
      </div>
    </ActionMenuContext.Provider>
  );
});

export const useActionMenu = () => {
  return useContext(ActionMenuContext);
};

export default ActionMenu;
