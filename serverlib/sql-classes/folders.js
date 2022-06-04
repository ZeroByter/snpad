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

    static async update(id, title, encryptTitle, titleHint) {
        await psqlUpdate("folders", {
            title,
            titleencrypted: encryptTitle,
            titleHint
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