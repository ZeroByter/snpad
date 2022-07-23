import Link from "next/link";
import { useRouter } from "next/router"
import Text from "./text";
import css from "./loggedIn.module.scss"
import NewFolderButton from "./newFolder/newFolderButton";
import Folder from "./folder";
import { useSSRFetcher } from "../contexts/ssrFetcher";

export default function LoggedIn({ texts, isRootFolder, folders, parentFolderId }) {
    const router = useRouter()
    const ssrFetcher = useSSRFetcher()

    let renderGoBackFolder = null
    if (!isRootFolder) {
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

    const handleOnCreated = (_title, _encryptTitle, _titleHint, newFolders) => {
        ssrFetcher.setProps(oldState => {
            return {
                ...oldState,
                folders: newFolders
            }
        })
    }

    let newTextUrl = "/newText"
    if (router.query.id) {
        newTextUrl = `/newText#${router.query.id}`
    }

    return (
        <div>
            <div className={css.controlsContainer}>
                <Link href={newTextUrl}>new text</Link>
                <NewFolderButton onCreated={handleOnCreated} />
            </div>
            <div className={css.textsContainer}>
                {renderGoBackFolder}
                {renderFolders}
                {renderTexts}
            </div>
        </div>
    )
}