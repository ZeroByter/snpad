import cryptoJs from "crypto-js";
import Link from "next/link";
import { useState } from "react";
import MoveToFolderButton from "./moveToFolder/moveToFolderButton"

export default function Text({ text }) {
    const [decryptedTitle, setDecryptedTitle] = useState(null)

    const handleDecryptTitle = e => {
        e.preventDefault()

        promptTitleDecrypt()
    }

    const promptTitleDecrypt = () => {
        const password = prompt("input password")
        if (password != null) {
            try {
                const decrypted = cryptoJs.AES.decrypt(text.title, password).toString(cryptoJs.enc.Utf8)

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

    const moveToFolderButton = <MoveToFolderButton isText={true} itemId={text.id} />

    if (text.titleencrypted) {
        let renderTitle
        let renderDecryptLink
        if (decryptedTitle == null) {
            renderTitle = `${text.titlehint} [title encrypted]`
            // renderDecryptLink = <a href="#" onClick={handleDecryptTitle}>decrypt title</a>
        } else {
            renderTitle = decryptedTitle
        }

        return <div><Link href={`/text/${text.id}`}>{renderTitle}</Link> {renderDecryptLink} - {moveToFolderButton}</div>
    } else {
        return <div><Link href={`/text/${text.id}`}>{text.title}</Link> - {moveToFolderButton}</div>
    }
}