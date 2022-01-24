import Link from "next/link";
import crypto from "crypto"
import { useRef, useState } from "react";
import Router from "next/router";

export default function LoginPage() {
    const [message, setMessage] = useState(null)

    const usernameRef = useRef("")
    const passwordRef = useRef("")

    const handleUsernameChange = e => {
        usernameRef.current = e.target.value
    }

    const handlePasswordChange = e => {
        passwordRef.current = crypto.createHash("sha256").update(e.target.value).digest("hex")
    }

    const handleFormSubmit = async e => {
        e.preventDefault()

        const rawResponse = await fetch("http://localhost:3000/api/login", {
            "headers": {},
            "body": JSON.stringify({
                username: usernameRef.current,
                password: passwordRef.current,
            }),
            "method": "POST"
        });
        const response = await rawResponse.text()

        if (response == "success") {
            setMessage("logged in! Redirecting in three seconds")

            setTimeout(() => {
                Router.push("/")
            }, 3000)
        }else{
            setMessage(response)
        }
    }

    return (
        <div>
            <Link href="/">back home</Link>

            <form onSubmit={handleFormSubmit}>
                <div><input required placeholder="Username" onChange={handleUsernameChange} /></div>
                <div><input required type="password" placeholder="Password" onChange={handlePasswordChange} /></div>
                <div><button type="submit">login</button></div>
                <div>{message}</div>
                <div><Link href="/register">create account instead</Link></div>
            </form>
        </div>
    )
}