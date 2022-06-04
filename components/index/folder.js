import cryptoJs from "crypto-js";
import Link from "next/link";
import { useState } from "react";

export default function Folder({ folder }) {
    const [decryptedTitle, setDecryptedTitle] = useState(null)

    const handleDecryptTitle = e => {
        e.preventDefault()

        promptTitleDecrypt()
    }

    const promptTitleDecrypt = () => {
        const password = prompt("input password")
        if (password != null) {
            try {
                const decrypted = cryptoJs.AES.decrypt(folder.title, password).toString(cryptoJs.enc.Utf8)

                if (decrypted.length == 0) {
                    promptTitleDecrypt()
                } else {
                    setDecryptedTitle(decrypted)
                }
            } catch {
                promptTitleDecrypt()
            }
        }
    }

    if (folder.titleencrypted) {
        let renderTitle
        let renderDecryptLink
        if (decryptedTitle == null) {
            renderTitle = `${folder.titlehint} [title encrypted]`
            // renderDecryptLink = <a href="#" onClick={handleDecryptTitle}>decrypt title</a>
        } else {
            renderTitle = decryptedTitle
        }

        return <div><i><Link href={`/folder/${folder.id}`}>{renderTitle}</Link></i> {renderDecryptLink}</div>
    } else {
        if (folder.id == "goback") {
            if (folder.folderid == null) {
                return <div><i><Link href={`/folder/${folder.id}`}>{folder.title}</Link></i></div>
            } else {
                return <div><i><Link href={`/folder/${folder.id}`}>{folder.title}</Link></i></div>
            }
        } else {
            return <div><i><Link href={`/folder/${folder.id}`}>{folder.title}</Link></i></div>
        }
    }
}