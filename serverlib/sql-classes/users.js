import crypto from "crypto"
import { randomId } from "../../sharedlib/essentials"
import psqlQuery, { psqlInsert } from "../psql-conn.js"

export default class UsersSQL {
    static async getById(id) {
        const data = await psqlQuery("SELECT * FROM users WHERE id=$1", [id])

        return data[0]
    }

    static async getByUsername(username) {
        const data = await psqlQuery("SELECT * FROM users WHERE LOWER(username)=LOWER($1)", [username])

        return data[0]
    }

    static async getByUsernameAndPassword(username, password) {
        const data = await psqlQuery(`SELECT * FROM users WHERE LOWER("username")=LOWER($1) AND "password"=(SUBSTRING("password"::TEXT FROM 0 FOR 65) || encode(sha256(SUBSTRING("password"::BYTEA FROM 0 FOR 65) || $2), 'hex'));`, [username, password])

        return data[0]
    }

    static async create(username, password) {
        const newId = randomId()

        let hash = randomId(64)

        await psqlInsert("users", {
            id: newId,
            username,
            password: `${hash}${crypto.createHash("sha256").update(hash + password).digest("hex")}`,
            timecreated: Date.now()
        })

        return newId
    }
}