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
    if (req.body.data == null) {
        res.send({
            error: "data is missing"
        })
        return
    }
    if (req.body.title == null) {
        res.send({
            error: "title is missing"
        })
        return
    }
    if (req.body.encryptTitle == null) {
        res.send({
            error: "encryptTitle is missing"
        })
        return
    }

    const newId = await TextsSQL.update(req.body.id, req.body.data, req.body.title, req.body.encryptTitle)

    res.send({
        error: null,
        newId
    })
}