import Link from "next/link";
import Text from "./text";
import css from "./loggedIn.module.scss"
import NewFolderButton from "./newFolder/newFolderButton";
import Folder from "./folder";

export default function LoggedIn({ texts, isRootFolder, folders, parentFolderId }) {
    let renderGoBackFolder = null
    if(!isRootFolder){
        renderGoBackFolder = (
            <i><Link href={parentFolderId ? `/folder/${parentFolderId}` : "/"}>[...]</Link></i>
        )
    }

    const renderFolders = folders.map(folder => {
        return <Folder key={folder.id} folder={folder} />
    })

    const renderTexts = texts.map(text => {
        return <Text key={text.id} text={text} />
    })

    return (
        <div>
            <div className={css.controlsContainer}>
                <Link href="/newText">new text</Link>
                <NewFolderButton />
            </div>
            <div className={css.textsContainer}>
                {renderGoBackFolder}
                {renderFolders}
                {renderTexts}
            </div>
        </div>
    )
}