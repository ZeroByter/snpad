import { getLoginSession } from "../../../serverlib/auth"
import FoldersSQL from "../../../serverlib/sql-classes/folders"

export default async function handle(req, res){
    const session = await getLoginSession(req)

    if (session == null) {
        res.send({
            error: "not logged in"
        })
        return
    }

    if(req.body.title == null){
        res.send({
            error: "title is missing"
        })
        return
    }
    if(req.body.titleHint == null){
        res.send({
            error: "titleHint is missing"
        })
        return
    }
    if(req.body.encryptTitle == null){
        res.send({
            error: "encryptTitle is missing"
        })
        return
    }

    if(req.body.parent != null){
        const folder = await FoldersSql.getById(req.body.parent)

        if(folder == null || folder.userid != session.id){
            res.send({
                error: "parent is not a valid folder"
            })
            return
        }
    }

    const newId = await FoldersSQL.create(session.id, req.body.parent, req.body.title, req.body.encryptTitle, req.body.titleHint)

    const folders = await FoldersSQL.getAllInParent(session.id, req.body.parent)

    res.send({
        error: null,
        folders
    })
}