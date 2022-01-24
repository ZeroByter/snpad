import crypto from "crypto"
import { randomId } from "../../sharedlib/essentials"
import psqlQuery, { psqlInsert, psqlUpdate } from "../psql-conn.js"

export default class TextsSQL {
    static async getById(id) {
        const data = await psqlQuery("SELECT * FROM texts WHERE id=$1", [id])
        return data[0]
    }

    static async getAllByUserId(userId) {
        return await psqlQuery("SELECT id, title, titleencrypted, titlehint FROM texts WHERE userid=$1 ORDER BY timecreated DESC", [userId])
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