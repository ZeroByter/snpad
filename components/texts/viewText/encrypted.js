import cryptoJs from "crypto-js"
import { useEffect, useRef, useState } from "react"

export default function Encrypted({ rawData, rawTitle, titleEncrypted, onDecrypted, incorrectDefaultPassword }) {
    const [message, setMessage] = useState("")

    const passwordRef = useRef()

    useEffect(() => {
        if(incorrectDefaultPassword){
            setMessage("wrong password, please try again")
        }
    }, [incorrectDefaultPassword])

    const handleOnSubmit = e => {
        e.preventDefault()

        try {
            const decryptedText = cryptoJs.AES.decrypt(rawData, passwordRef.current.value).toString(cryptoJs.enc.Utf8)

            if (decryptedText.length != 0) {
                let title
                if (titleEncrypted) {
                    title = cryptoJs.AES.decrypt(rawTitle, passwordRef.current.value).toString(cryptoJs.enc.Utf8)
                } else {
                    title = rawTitle
                }

                onDecrypted(decryptedText, title, passwordRef.current.value)
            } else {
                setMessage("wrong password, please try again")
            }
        } catch {
            setMessage("wrong password, please try again")
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={handleOnSubmit}>
                    password: <input required ref={passwordRef} type="password" /> <button>decrypt</button>
                </form>
            </div>
            <div>{message}</div>
        </div>
    )
}