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

    const { id } = req.body

    if (id == null) {
        res.send({
            error: "id is missing"
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

    FoldersSQL.delete(id)

    res.send({
        error: null
    })
}