import NewFolderMenu from "./newFolderMenu";
import css from "./newFolderButton.module.scss"
import { useState } from "react";

export default function NewFolderButton(){
    const [showMenu, setShowMenu] = useState(false)

    const handleClick = () => {
        setShowMenu(!showMenu)
    }

    return (
        <div className={css.container}>
            <span onClick={handleClick}>new folder</span>
            <NewFolderMenu visible={showMenu} onCreated={()=>setShowMenu(false)} />
        </div>
    )
}