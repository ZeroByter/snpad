import cryptoJs from "crypto-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import MoveToFolderButton from "./moveToFolder/moveToFolderButton"
import NewFolderButton from "./newFolder/newFolderButton";

export default function Folder({ folder }) {
    const [folderState, setFolderState] = useState(folder)
    const [decryptedTitle, setDecryptedTitle] = useState(null)

    useEffect(() => {
        setFolderState(folder)
    }, [folder])

    const handleDecryptTitle = e => {
        e.preventDefault()

        promptTitleDecrypt()
    }

    const promptTitleDecrypt = () => {
        const password = prompt("input password")
        if (password != null) {
            try {
                const decrypted = cryptoJs.AES.decrypt(folderState.title, password).toString(cryptoJs.enc.Utf8)

                if (decrypted.length >= 10 && decrypted.substring(0, 5) == decrypted.substring(decrypted.length - 5)) {
                    setDecryptedTitle(decrypted.substring(5, decrypted.length - 5))
                } else {
                    promptTitleDecrypt()
                }
            } catch {
                promptTitleDecrypt()
            }
        }
    }

    const handleOnRename = (title, encryptTitle, titleHint) => {
        setFolderState(oldFolder => {
            return {
                ...oldFolder,
                title,
                titleencrypted: encryptTitle,
                titlehint: titleHint
            }
        })
    }

    const handleDelete = () => {
        if(confirm("Are you sure you want to delete this folder forever?\nAll recursive items in this folder will be deleted forever!")){
            //TODO: Send request to delete this folder, mysql referenced items will take care of deleteing all child items forever
        }
    }

    const moveToFolderButton = <MoveToFolderButton isText={false} itemId={folderState.id} />
    const renameButton = <NewFolderButton existingFolder={folderState} onCreated={handleOnRename} />
    const deleteButton = <button onClick={handleDelete}>delete</button>

    if (folderState.titleencrypted) {
        let renderTitle
        let renderDecryptLink
        if (decryptedTitle == null) {
            renderTitle = `${folderState.titlehint} [title encrypted]`
            renderDecryptLink = <button onClick={handleDecryptTitle}>decrypt title</button>
        } else {
            renderTitle = decryptedTitle
        }


        return <div><i><Link href={`/folder/${folderState.id}`}>{renderTitle}</Link></i> - {renderDecryptLink} {moveToFolderButton} {renameButton} {deleteButton}</div>
    } else {
        return <div><i><Link href={`/folder/${folderState.id}`}>{folderState.title}</Link></i> - {moveToFolderButton} {renameButton} {deleteButton}</div>
    }
}