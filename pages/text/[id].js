import cryptoJs from "crypto-js"
import Link from "next/link"
import { useEffect, useState } from "react"
import Decrypted from "../../components/texts/viewText/decrypted"
import Encrypted from "../../components/texts/viewText/encrypted"
import { getLoginSession } from "../../serverlib/auth"
import TextsSQL from "../../serverlib/sql-classes/texts"

export async function getServerSideProps(context) {
    const { id } = context.query

    const text = await TextsSQL.getById(id)

    let readOnly = true
    const session = await getLoginSession(context.req)
    if(session?.id != null){
        readOnly = text.userid != session.id
    }

    if (text == null) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            id,
            rawData: text.data,
            rawTitle: text.title,
            titleHint: text.titlehint,
            titleEncrypted: text.titleencrypted,
            readOnly
        }
    }
}

export default function ViewText({ readOnly, id, rawData, rawTitle, titleHint, titleEncrypted }) {
    const [incorrectDefaultPassword, setIncorrectDefaultPassword] = useState(false)

    const [decrypted, setDecrypted] = useState(false)
    const [text, setText] = useState()
    const [title, setTitle] = useState()
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (window.location.hash.length != 0) {
            let defaultPassword = window.location.hash.slice(1)

            try {
                const decryptedText = cryptoJs.AES.decrypt(rawData, defaultPassword).toString(cryptoJs.enc.Utf8)

                if (decryptedText.length != 0) {
                    let title
                    if (titleEncrypted) {
                        title = cryptoJs.AES.decrypt(rawTitle, defaultPassword).toString(cryptoJs.enc.Utf8)
                    } else {
                        title = rawTitle
                    }

                    handleDecrypted(decryptedText, title, defaultPassword)
                } else {
                    setIncorrectDefaultPassword(true)
                }
            } catch {
                setIncorrectDefaultPassword(true)
            }
        }
    }, [])

    const handleDecrypted = (newText, newTitle, password) => {
        setText(newText)
        setTitle(newTitle)

        setPassword(password)
        setDecrypted(true)
    }

    let renderedContents
    if (decrypted) {
        renderedContents = <Decrypted readOnly={readOnly} id={id} text={text} title={title} titleHint={titleHint} titleEncrypted={titleEncrypted} password={password} />
    } else {
        renderedContents = <Encrypted rawData={rawData} rawTitle={rawTitle} titleEncrypted={titleEncrypted} onDecrypted={handleDecrypted} incorrectDefaultPassword={incorrectDefaultPassword} />
    }

    return (
        <div>
            <Link href="/">back home</Link>
            {renderedContents}
        </div>
    )
}