import { serialize } from "cookie"
import { TOKEN_NAME } from "../../serverlib/auth-cookies"

export default async function handle(req, res) {
    const cookie = serialize(TOKEN_NAME, "", {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })

    res.setHeader('Set-Cookie', cookie)

    res.redirect("/")
}