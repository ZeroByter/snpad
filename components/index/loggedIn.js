import Link from "next/link";
import Text from "./text";
import css from "./loggedIn.module.scss"
import NewFolderButton from "./newFolder/newFolderButton";

export default function LoggedIn({ texts }) {
    const renderTexts = texts.map(text => {
        return <Text key={text.id} text={text} />
    })

    return (
        <div>
            <div className={css.controlsContainer}>
                <Link href="/newText">new text</Link>
                <NewFolderButton />
            </div>
            <div className={css.textsContainer}>
                {renderTexts}
            </div>
        </div>
    )
}