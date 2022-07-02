import NewFolderMenu from "./newFolderMenu";
import css from "./newFolderButton.module.scss"
import { useState } from "react";

export default function NewFolderButton({ existingFolder, onCreated }) {
    const [showMenu, setShowMenu] = useState(false)

    const handleClick = () => {
        setShowMenu(!showMenu)
    }

    const handleOnCreated = (title, encryptTitle, titleHint) => {
        onCreated(title, encryptTitle, titleHint)
        
        setShowMenu(false)
    }

    let newFolderButton
    if (existingFolder != null) {
        newFolderButton = <button onClick={handleClick}>rename</button>
    } else {
        newFolderButton = <span onClick={handleClick}>new folder</span>
    }

    return (
        <div className={css.container} data-existingfolder={existingFolder != null}>
            {newFolderButton}
            <NewFolderMenu visible={showMenu} onCreated={handleOnCreated} existingFolder={existingFolder} />
        </div>
    )
}