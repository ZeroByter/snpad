import cryptoJs from "crypto-js"
import { useRouter } from "next/router"
import { useState, useRef } from "react"
import { randomId } from "../../../sharedlib/essentials"
import css from "./newFolderMenu.module.scss"

export default function NewFolderMenu({ visible, onCreated }) {
    const router = useRouter()

    const startedCreationRef = useRef(false)

    const [title, setTitle] = useState("")
    const [encryptTitle, setEncryptTitle] = useState(false)
    const [titleHint, setTitleHint] = useState("")
    const [titlePassword, setTitlePassword] = useState("")

    const handleCreate = async e => {
        e.preventDefault()

        if (startedCreationRef.current) return
        startedCreationRef.current = true

        let finalTitle
        if (encryptTitle) {
            const randomValue = randomId(5)
            finalTitle = cryptoJs.AES.encrypt(randomValue + title + randomValue, titlePassword).toString()
        } else {
            finalTitle = title
        }

        const rawResponse = await fetch("/api/folders/create", {
            "headers": {
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                parent: router.query.id,
                title: finalTitle,
                titleHint,
                encryptTitle,
            }),
            "method": "POST"
        });
        const response = await rawResponse.json()

        if (response.error == null) {
            
        }

        setTitle("")
        setEncryptTitle(false)
        setTitleHint("")
        setTitlePassword("")

        onCreated()
    }

    return (
        <div className={css.container} data-visible={visible}>
            <form onSubmit={handleCreate}>
                <div>create new folder</div>
                <div>
                    <div>
                        <label>title: <input required value={title} onChange={e => setTitle(e.target.value)} /></label>
                        <label className={css.encryptTitleContainer}>encrypt title: <input type="checkbox" checked={encryptTitle} onChange={e => setEncryptTitle(e.target.checked)} /></label>
                    </div>
                    <div className={css.encryptionContainer} data-visible={encryptTitle}>
                        <label>title hint: <input value={titleHint} onChange={e => setTitleHint(e.target.value)} /></label>
                        <label>title password: <input type="password" value={titlePassword} onChange={e => setTitlePassword(e.target.value)} /></label>
                    </div>
                </div>
                <input type="submit" value="create" />
            </form>
        </div >
    )
}