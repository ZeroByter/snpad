import { randomId } from "../../sharedlib/essentials"
import psqlQuery, { psqlInsert, psqlUpdate } from "../psql-conn.js"

export default class TextsSQL {
    static async getById(id) {
        const data = await psqlQuery("SELECT * FROM texts WHERE id=$1", [id])
        return data[0]
    }

    static async getAllInParent(userId, parentId) {
        if (parentId == null) {
            return await psqlQuery("SELECT id, title, titleencrypted, titlehint FROM texts WHERE userid=$1 and folderid is null ORDER BY timecreated DESC", [userId])
        } else {
            return await psqlQuery("SELECT id, title, titleencrypted, titlehint FROM texts WHERE userid=$1 and folderid=$2 ORDER BY timecreated DESC", [userId, parentId])
        }
    }

    static async update(id, data, title, encryptTitle, titleHint) {
        await psqlUpdate("texts", {
            data,
            title,
            titleencrypted: encryptTitle,
            titleHint
        }, {
            id
        })
    }

    static async delete(id) {
        await psqlQuery("DELETE FROM texts WHERE id=$1", [id])
    }

    static async create(userId, data, title, encryptTitle, titleHint) {
        const newId = randomId()

        await psqlInsert("texts", {
            id: newId,
            folderid: null,
            userid: userId,
            data,
            timecreated: Date.now(),
            title,
            titleencrypted: encryptTitle,
            titleHint
        })

        return newId
    }
}