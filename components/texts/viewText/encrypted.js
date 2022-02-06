import cryptoJs from "crypto-js"
import { useEffect, useRef, useState } from "react"
import attemptDecrypt from "../../../clientlib/attempt-decrypt"

export default function Encrypted({ rawData, rawTitle, titleEncrypted, onDecrypted, incorrectDefaultPassword }) {
    const [message, setMessage] = useState("")

    const passwordRef = useRef()

    useEffect(() => {
        if (incorrectDefaultPassword) {
            setMessage("wrong password, please try again")
        }
    }, [incorrectDefaultPassword])

    const handleOnSubmit = e => {
        e.preventDefault()

        var decryptedData = attemptDecrypt(passwordRef.current.value, rawData, titleEncrypted, rawTitle)
        if (decryptedData != null) {
            onDecrypted(decryptedData.decryptedText, decryptedData.title, passwordRef.current.value)
        } else {
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