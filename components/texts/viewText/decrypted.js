import cryptoJs from "crypto-js"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { randomId } from "../../../sharedlib/essentials"
import css from "./decrypted.module.scss"

export default function Decrypted({ readOnly, id, text, title, titleHint, titleEncrypted, password }) {
    const titleRef = useRef()
    const titleHintRef = useRef()
    const encryptTitleRef = useRef()

    const textareaRef = useRef()
    const passwordRef = useRef()

    const navTimeoutRef = useRef()

    const [message, setMessage] = useState("")
    const [viewTitleHint, setViewTitleHint] = useState(titleEncrypted)

    const router = useRouter()

    useEffect(() => {
        return () => {
            clearTimeout(navTimeoutRef.current)
        }
    }, [])

    const handleOnSubmit = async e => {
        e.preventDefault()

        const randomValue = randomId(5)
        const encryptedText = cryptoJs.AES.encrypt(randomValue + textareaRef.current.value + randomValue, passwordRef.current.value).toString()

        let finalTitle
        if (encryptTitleRef.current.checked) {
            finalTitle = cryptoJs.AES.encrypt(titleRef.current.value, passwordRef.current.value).toString()
        } else {
            finalTitle = titleRef.current.value
        }

        const rawResponse = await fetch("/api/texts/update", {
            "headers": {},
            "body": JSON.stringify({
                id,
                data: encryptedText,
                title: finalTitle,
                titleHint: titleHintRef.current?.value,
                encryptTitle: encryptTitleRef.current.checked
            }),
            "method": "POST"
        });
        const response = await rawResponse.json()

        if (response.error == null) {
            setMessage("updated")

            navTimeoutRef.current = setTimeout(() => {
                setMessage("")
            }, 5000)
        } else {
            setMessage(response.error)
        }
    }

    const handleDelete = async () => {
        if (confirm("are you sure you want to delete? This is irreversible!")) {
            const rawResponse = await fetch("/api/texts/delete", {
                "headers": {},
                "body": JSON.stringify({
                    id,
                }),
                "method": "POST"
            });
            const response = await rawResponse.json()

            if (response.error == null) {
                router.replace("/html/")
            } else {
                setMessage(response.error)
            }
        }
    }

    let renderTitleHintInput
    if (viewTitleHint) {
        renderTitleHintInput = (
            <div>title hint: <input readOnly={readOnly} ref={titleHintRef} defaultValue={titleHint} /> <span title="when your title is encrypted, this will be title shown instead">[?]</span></div>
        )
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <div>title: <input readOnly={readOnly} ref={titleRef} defaultValue={title} /> encrypt title: <input disabled={readOnly} ref={encryptTitleRef} type="checkbox" defaultChecked={titleEncrypted} onChange={e => setViewTitleHint(e.target.checked)} /></div>
                {renderTitleHintInput}
                <div>
                    <textarea readOnly={readOnly} required className={css.textarea} ref={textareaRef} defaultValue={text} />
                </div>
                <div className={css.passwordContainer} data-visible={!readOnly}>password: <input required type="password" ref={passwordRef} defaultValue={password} /> <button>update</button></div>
                <div className={css.deleteContainer} data-visible={!readOnly}>
                    <button type="button" onClick={handleDelete}>delete</button>
                </div>
            </form>
            <div>{message}</div>
        </div>
    )
}