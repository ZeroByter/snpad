import { setLoginSession } from "../../serverlib/auth"
import UsersSQL from "../../serverlib/sql-classes/users"

export default async function handle(req, res) {
    try {
        req.body = JSON.parse(req.body)
    } catch {
        res.status(400).send("Missing body / not JSON")
        return
    }

    const username = req.body?.username
    const password = req.body?.password

    if (username == null || password == null) {
        res.status(400).send("Username or password is missing")
        return
    }

    const existingUser = await UsersSQL.getByUsername(username)
    if (existingUser != null) {
        res.status(400).send("Username already exists")
        return
    }

    const newId = await UsersSQL.create(username, password)

    await setLoginSession(res, { id: newId })

    res.send("success")
}