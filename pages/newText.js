import Router from "next/router"
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import css from "./newText.module.scss"
import CryptoJS from "crypto-js"
import { randomId } from "../sharedlib/essentials"

export default function NewText() {
    const titleRef = useRef()
    const titleHintRef = useRef()
    const encryptTitleRef = useRef()

    const passwordRef = useRef()
    const textRef = useRef()

    const navTimeoutRef = useRef()

    const startedCreationRef = useRef(false)

    const [viewTitleHint, setViewTitleHint] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        return () => {
            clearTimeout(navTimeoutRef.current)
        }
    }, [])

    const handleFormSubmit = async e => {
        e.preventDefault()

        if(startedCreationRef.current) return
        startedCreationRef.current = true

        const randomValue = randomId(5)
        const encryptedText = CryptoJS.AES.encrypt(randomValue + textRef.current.value + randomValue, passwordRef.current.value).toString()
        let title
        if (encryptTitleRef.current.checked) {
            title = CryptoJS.AES.encrypt(titleRef.current.value, passwordRef.current.value).toString()
        } else {
            title = titleRef.current.value
        }

        let folderId = window.location.hash.slice(1)
        if(folderId == ""){
            folderId = null
        }

        const rawResponse = await fetch("/api/texts/create", {
            "headers": {},
            "body": JSON.stringify({
                folderId: folderId,

                title,
                titleHint: titleHintRef.current?.value,
                encryptTitle: encryptTitleRef.current.checked,

                data: encryptedText,
            }),
            "method": "POST"
        });
        const response = await rawResponse.json()

        if (response.error == null) {
            setMessage("created text, redirecting in two seconds")

            navTimeoutRef.current = setTimeout(() => {
                Router.replace("/text/" + response.newId + "#" + passwordRef.current.value)
            }, 2000)
        } else {
            startedCreationRef.current = false
            setMessage(response.error)
        }
    }

    let renderTitleHintInput
    if(viewTitleHint){
        renderTitleHintInput = (
            <div>title hint: <input ref={titleHintRef} /> <span title="when your title is encrypted, this will be the title shown instead">[?]</span></div>
        )
    }

    return (
        <div>
            <div><Link href="/">home</Link></div>
            <form onSubmit={handleFormSubmit}>
                <div className={css.container}>
                    <div><label>title: <input ref={titleRef} /></label> <label>encrypt title: <input ref={encryptTitleRef} type="checkbox" onChange={e => setViewTitleHint(e.target.checked)} /></label></div>
                    {renderTitleHintInput}
                    <textarea required ref={textRef} className={css.textarea} />
                    <div className={css.passwordContainer}>
                        <label>
                            <div className={css.passwordLabel}>password:</div>
                            <div className={css.passwordInputContainer}><input required ref={passwordRef} type={showPassword ? "text" : "password"} /></div>
                        </label>
                        <div><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "hide" : "show"}</button></div>
                    </div>
                </div>
                <div>{message}</div>
                <div><button type="submit">create</button></div>
            </form>

            <div className={css.dontForgetWarning}>when creating your new text, make sure to remember your password! if lost, there is no way to recover the password and the encrypted text inside...</div>
        </div >
    )
}