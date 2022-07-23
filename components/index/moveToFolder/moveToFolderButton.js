import MoveToFolderMenu from "./moveToFolderMenu";
import css from "./moveToFolderButton.module.scss"
import { useState } from "react";

export default function moveToFolderButton({ isText, itemId }){
    const [showMenu, setShowMenu] = useState(false)

    const handleClick = () => {
        setShowMenu(!showMenu)
    }

    return (
        <span className={css.container}>
            <button onClick={handleClick}>move</button>
            <MoveToFolderMenu visible={showMenu} onMoved={()=>setShowMenu(false)} isText={isText} itemId={itemId} />
        </span>
    )
}