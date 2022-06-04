import cryptoJs from "crypto-js"
import { useRouter } from "next/router"
import { useState, useRef } from "react"
import { randomId } from "../../../sharedlib/essentials"
import css from "./moveToFolderMenu.module.scss"

export default function moveToFolderMenu({ visible, onCreated }) {
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
                title,
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
            <div>move to new folder</div>
            <div>
                <input placeholder="search" />
            </div>
            <div>
                ... all user folders would appear here
            </div>
        </div >
    )
}