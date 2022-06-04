import { getLoginSession } from "../../../serverlib/auth"
import TextsSQL from "../../../serverlib/sql-classes/texts"

export default async function handle(req, res) {
    const session = await getLoginSession(req)

    if (session == null) {
        res.send({
            error: "anonymous texts are not yet supported..."
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

    if(req.body.title == null){
        res.send({
            error: "title is missing"
        })
        return
    }
    if(req.body.encryptTitle == null){
        res.send({
            error: "encryptTitle is missing"
        })
        return
    }
    if(req.body.data == null){
        res.send({
            error: "data is missing"
        })
        return
    }

    const newId = await TextsSQL.create(session.id, req.body.data, req.body.title, req.body.encryptTitle, req.body.titleHint, req.body.folderId)

    res.send({
        error: null,
        newId
    })
}