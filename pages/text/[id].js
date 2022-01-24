import Link from "next/link"
import { useState } from "react"
import Decrypted from "../../components/texts/viewText/decrypted"
import Encrypted from "../../components/texts/viewText/encrypted"
import TextsSQL from "../../serverlib/sql-classes/texts"

export async function getServerSideProps(context) {
    const { id } = context.query

    const text = await TextsSQL.getById(id)

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
            titleEncrypted: text.titleencrypted
        }
    }
}

export default function ViewText({ id, rawData, rawTitle, titleHint, titleEncrypted }) {
    const [decrypted, setDecrypted] = useState(false)
    const [text, setText] = useState()
    const [title, setTitle] = useState()
    const [password, setPassword] = useState("")

    const handleDecrypted = (newText, newTitle, password) => {
        setText(newText)
        setTitle(newTitle)

        setPassword(password)
        setDecrypted(true)
    }

    let renderedContents
    if (decrypted) {
        renderedContents = <Decrypted id={id} text={text} title={title} titleHint={titleHint} titleEncrypted={titleEncrypted} password={password} />
    } else {
        renderedContents = <Encrypted rawData={rawData} rawTitle={rawTitle} titleEncrypted={titleEncrypted} onDecrypted={handleDecrypted} />
    }

    return (
        <div>
            <Link href="/">back home</Link>
            {renderedContents}
        </div>
    )
}