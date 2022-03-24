import { getLoginSession } from "../../../serverlib/auth"

export default async function handle(req, res){
    const session = await getLoginSession(req)

    if (session == null) {
        res.send({
            error: "not logged in"
        })
        return
    }

    if(req.body.parent == null){
        res.send({
            error: "parent is missing"
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

    //const newId = await TextsSQL.create(session.id, req.body.data, req.body.title, req.body.encryptTitle, req.body.titleHint)

    //TODO: Create new folder here
    //TODO: return list of folders in response

    res.send({
        
    })
}