import { randomId } from "../../sharedlib/essentials"
import psqlQuery, { psqlInsert, psqlUpdate } from "../psql-conn.js"

export default class FoldersSQL {
    static async getById(id) {
        const data = await psqlQuery("SELECT * FROM folders WHERE id=$1", [id])
        return data[0]
    }

    static async getAllInParent(userId, parentId) {
        if (parentId == null) {
            return await psqlQuery("SELECT * FROM folders WHERE userid=$1 AND folderid is null ORDER BY timecreated DESC", [userId])
        } else {
            return await psqlQuery("SELECT * FROM folders WHERE userid=$1 AND folderid=$2 ORDER BY timecreated DESC", [userId, parentId])
        }
    }

    static async getSearch(userId, search, itemId, parentId) {
        search = `%${search}%`

        return await psqlQuery("SELECT id, (CASE WHEN titleencrypted THEN titlehint ELSE title END) as title FROM folders WHERE userid=$1 AND id != $2 AND id != $3 AND (CASE WHEN titleencrypted THEN titlehint LIKE $4 ELSE title LIKE $4 END) LIMIT 5", [userId, itemId ?? "", parentId ?? "", search])
    }

    static async rename(id, title, encryptTitle, titleHint) {
        await psqlUpdate("folders", {
            title,
            titleencrypted: encryptTitle,
            titleHint
        }, {
            id
        })
    }

    static async move(id, newParentId) {
        await psqlUpdate("folders", {
            folderid: newParentId
        }, {
            id
        })
    }

    static async delete(id) {
        await psqlQuery("DELETE FROM folders WHERE id=$1", [id])
    }

    static async create(userId, folderId, title, encryptTitle, titleHint) {
        const newId = randomId()

        await psqlInsert("folders", {
            id: newId,
            folderId,
            userId,
            timecreated: Date.now(),
            title,
            titleencrypted: encryptTitle,
            titleHint
        })

        return newId
    }
}