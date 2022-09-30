import { getLoginSession } from "../../../serverlib/auth"
import TextsSQL from "../../../serverlib/sql-classes/texts"

export default async function handle(req, res) {
    const session = await getLoginSession(req)

    if (session == null) {
        res.send({
            error: "not logged in"
        })
        return
    }

    try {
        req.body = JSON.parse(req.body)
    } catch {
        res.status(400).send({
            error: "Missing body / not JSON"
        })
        return
    }

    if (req.body.id == null) {
        res.send({
            error: "id is missing"
        })
        return
    }

    const text = await TextsSQL.getById(req.body.id)
    if (text == null || text.userid != session.id) {
        res.send({
            error: "text doesn't exist"
        })
        return
    }

    await TextsSQL.delete(req.body.id)

    res.send({
        error: null
    })
}