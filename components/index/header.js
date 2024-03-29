import Link from "next/link";
import css from "./header.module.scss"

export default function Header({ username }) {
    let userControls

    if (username != null) {
        userControls = (
            <div>
                Welcome, {username} <Link href="/api/logout">logout</Link>
            </div>
        )
    } else {
        userControls = (
            <div>
                <Link href="/html/login">Login</Link> <Link href="/html/register">Register</Link>
            </div>
        )
    }

    return (
        <div>
            <div className={css.info}>
                <p>
                    <b>snpad</b> (secret notepad) is a quick and simple web app I made to store encrypted data securely.<br />
                    the whole security aspect of snpad is that your password never leaves your browser.<br />
                    my server only stores your encrypted data, and nothing else.
                </p>
                <p>
                    additionally, the website uses the minimal amount of NodeJS packages and CSS to make it load and work as fast as possible.<br />
                    in the future, i might make a visually-pretty version of the frontend along side this stripped down version, but we{`'`}ll see...
                </p>
                <p>
                    the website source code is <a href="https://github.com/ZeroByter/snpad" target="_blank" rel="noreferrer">available here.</a><br />
                    if you find any places to improve the app, security-related or not, feel free to open an issue/PR!
                </p>
                <p>
                    public Trello board with some of my notes/tasks <a href="https://trello.com/b/tOaT1Q6z/secret-notepad" target="_blank" rel="noreferrer">can be found here.</a><br />
                </p>
            </div>
            {userControls}
        </div>
    )
}