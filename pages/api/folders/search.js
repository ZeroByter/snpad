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

    if(req.query.search == null){
        res.send({
            error: "search is missing"
        })
        return
    }

    const folders = await FoldersSQL.getSearch(session.id, req.query.search)

    res.send({
        error: null,
        folders
    })
}