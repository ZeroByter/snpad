import cryptoJs from "crypto-js"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import css from "./decrypted.module.scss"

export default function Decrypted({ id, text, title, titleEncrypted, password }) {
    const titleRef = useRef()
    const encryptTitleRef = useRef()

    const textareaRef = useRef()
    const passwordRef = useRef()
    const [message, setMessage] = useState("")
    const router = useRouter()

    const handleUpdate = async () => {
        const encryptedText = cryptoJs.AES.encrypt(textareaRef.current.value, passwordRef.current.value).toString()

        let finalTitle
        if(encryptTitleRef.current.checked){
            finalTitle = cryptoJs.AES.encrypt(titleRef.current.value, passwordRef.current.value).toString()
        }else{
            finalTitle = titleRef.current.value
        }

        const rawResponse = await fetch("http://localhost:3000/api/texts/update", {
            "headers": {},
            "body": JSON.stringify({
                id,
                data: encryptedText,
                title: finalTitle,
                encryptTitle: encryptTitleRef.current.checked
            }),
            "method": "POST"
        });
        const response = await rawResponse.json()

        if (response.error == null) {
            setMessage("updated")

            setTimeout(() => {
                setMessage("")
            }, 5000)
        } else {
            setMessage(response.error)
        }
    }

    return (
        <div>
            <div>title: <input ref={titleRef} defaultValue={title} /> encrypt title: <input ref={encryptTitleRef} type="checkbox" defaultChecked={titleEncrypted} /></div>
            <div>
                <textarea className={css.textarea} ref={textareaRef} defaultValue={text} />
            </div>
            <div>password: <input type="password" ref={passwordRef} defaultValue={password} /> <button onClick={handleUpdate}>update</button></div>
            <div>{message}</div>
        </div>
    )
}