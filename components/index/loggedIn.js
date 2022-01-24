import Link from "next/link";
import Text from "./text";
import css from "./loggedIn.module.scss"

export default function LoggedIn({ texts }) {
    const renderTexts = texts.map(text => {
        return <Text key={text.id} text={text} />
    })

    return (
        <div>
            <Link href="/newText">new text</Link>
            <div className={css.textsContainer}>
                {renderTexts}
            </div>
        </div>
    )
}