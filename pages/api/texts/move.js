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

    const text = await TextsSQL.getById(itemId)
    if (text == null) {
        res.send({
            error: "text doesn't exist"
        })
        return
    }

    if (text.userid != session.id) {
        res.send({
            error: "only owner of text can move it"
        })
        return
    }

    if (newParentId != null) {
        const folder = await FoldersSQL.getById(newParentId)
        if (folder == null || folder.userid != session.id) {
            res.send({
                error: "folder doesn't exist"
            })
            return
        }
    }

    const oldFolderId = text.folderid

    await TextsSQL.move(itemId, newParentId)

    const newTexts = await TextsSQL.getAllInParent(session.id, oldFolderId)

    res.send({
        error: null,
        newTexts
    })
}