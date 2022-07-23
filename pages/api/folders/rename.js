import { getLoginSession } from "../../../serverlib/auth"
import FoldersSQL from "../../../serverlib/sql-classes/folders"

export default async function handle(req, res) {
    const session = await getLoginSession(req)

    if (session == null) {
        res.send({
            error: "not logged in"
        })
        return
    }

    const { id, title, titleHint, encryptTitle } = req.body

    if (id == null) {
        res.send({
            error: "id is missing"
        })
        return
    }
    if (title == null) {
        res.send({
            error: "title is missing"
        })
        return
    }
    if (titleHint == null) {
        res.send({
            error: "titleHint is missing"
        })
        return
    }
    if (encryptTitle == null) {
        res.send({
            error: "encryptTitle is missing"
        })
        return
    }

    const folder = await FoldersSQL.getById(id)
    if (folder == null || folder.userid != session.id) {
        res.send({
            error: "folder doesn't exist"
        })
        return
    }

    FoldersSQL.rename(id, title, encryptTitle, titleHint)

    res.send({
        error: null
    })
}