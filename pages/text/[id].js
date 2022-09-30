import Link from "next/link"
import { useEffect, useState } from "react"
import attemptDecrypt from "../../clientlib/attempt-decrypt"
import Decrypted from "../../components/texts/viewText/decrypted"
import Encrypted from "../../components/texts/viewText/encrypted"
import { getLoginSession } from "../../serverlib/auth"
import TextsSQL from "../../serverlib/sql-classes/texts"

export async function getServerSideProps(context) {
    const { id } = context.query

    const text = await TextsSQL.getById(id)

    let readOnly = true
    const session = await getLoginSession(context.req)
    if (session?.id != null) {
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

            var decryptedData = attemptDecrypt(defaultPassword, rawData, titleEncrypted, rawTitle)
            if (decryptedData != null) {
                handleDecrypted(decryptedData.decryptedText, decryptedData.title, defaultPassword)
            } else {
                setIncorrectDefaultPassword(true)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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