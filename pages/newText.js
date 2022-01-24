import Router from "next/router"
import Link from "next/link";
import { useRef, useState } from "react";
import css from "./newText.module.scss"
import CryptoJS from "crypto-js"

export default function NewText() {
    const titleRef = useRef()
    const encryptTitleRef = useRef()

    const passwordRef = useRef()
    const textRef = useRef()
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState("")

    const handleCreate = async () => {
        // console.log(encryptTitleRef.current.checked)

        const encryptedText = CryptoJS.AES.encrypt(textRef.current.value, passwordRef.current.value).toString()
        let title
        if (encryptTitleRef.current.checked) {
            title = CryptoJS.AES.encrypt(titleRef.current.value, passwordRef.current.value).toString()
        } else {
            title = titleRef.current.value
        }

        const rawResponse = await fetch("http://localhost:3000/api/texts/create", {
            "headers": {},
            "body": JSON.stringify({
                title,
                encryptTitle: encryptTitleRef.current.checked,

                data: encryptedText,
            }),
            "method": "POST"
        });
        const response = await rawResponse.json()

        if (response.error == null) {
            setMessage("created text, redirecting in two seconds")

            setTimeout(() => {
                Router.push("/text/" + response.newId)
            }, 2000)
        } else {
            setMessage(response.error)
        }
    }

    return (
        <div>
            <div><Link href="/">home</Link></div>
            <div className={css.container}>
                <div><label>title: <input ref={titleRef} /></label> <label>encrypt title: <input ref={encryptTitleRef} type="checkbox" /></label></div>
                <textarea ref={textRef} className={css.textarea} />
                <div className={css.passwordContainer}>
                    <label>
                        <div className={css.passwordLabel}>password:</div>
                        <div className={css.passwordInputContainer}><input ref={passwordRef} type={showPassword ? "text" : "password"} /></div>
                    </label>
                    <div><button onClick={() => setShowPassword(!showPassword)}>{showPassword ? "hide" : "show"}</button></div>
                </div>
            </div>
            <div>{message}</div>
            <div><button onClick={handleCreate}>create</button></div>

            <div className={css.dontForgetWarning}>when creating your new text, make sure to remember your password! if lost, there is no way to recover the password and the encrypted text inside...</div>
        </div>
    )
}