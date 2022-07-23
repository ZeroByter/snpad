import { getLoginSession } from "../../../serverlib/auth"
import FoldersSQL from "../../../serverlib/sql-classes/folders"
import TextsSQL from "../../../serverlib/sql-classes/texts"

export default async function handle(req, res) {
    const session = await getLoginSession(req)

    if (session == null) {
        res.send({
            error: "not logged in"
        })
        return
    }

    const { itemId, newParentId } = req.body

    if (itemId == null) {
        res.send({
            error: "itemId is missing"
        })
        return
    }

    const folder = await FoldersSQL.getById(itemId)
    if (folder == null) {
        res.send({
            error: "folder doesn't exist"
        })
        return
    }

    if (folder.userid != session.id) {
        res.send({
            error: "only owner of folder can move it"
        })
        return
    }

    if (newParentId != null) {
        const folder = await FoldersSQL.getById(newParentId)
        if (folder == null || folder.userid != session.id) {
            res.send({
                error: "new parent folder doesn't exist"
            })
            return
        }
    }

    const oldFolderId = folder.folderid

    await FoldersSQL.move(itemId, newParentId)

    const newFolders = await FoldersSQL.getAllInParent(session.id, oldFolderId)

    res.send({
        error: null,
        newFolders
    })
}