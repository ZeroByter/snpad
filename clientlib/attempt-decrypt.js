import cryptoJs from "crypto-js"

export default function attemptDecrypt(password, rawData, titleEncrypted, rawTitle) {
    try {
        const decryptedText = cryptoJs.AES.decrypt(rawData, password).toString(cryptoJs.enc.Utf8)

        if (decryptedText.length >= 10 && decryptedText.substring(0, 5) == decryptedText.substring(decryptedText.length - 5)) {
            let title
            if (titleEncrypted) {
                title = cryptoJs.AES.decrypt(rawTitle, password).toString(cryptoJs.enc.Utf8)
            } else {
                title = rawTitle
            }

            return {
                decryptedText: decryptedText.substring(5, decryptedText.length - 5),
                title
            }
        } else {
            return null
        }
    } catch {
        return null
    }
}