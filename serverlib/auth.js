import cryptoJs from 'crypto-js'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies'

const TOKEN_SECRET = process.env.TOKEN_SECRET

export async function setLoginSession(res, session) {
  const createdAt = Date.now()
  // // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = cryptoJs.AES.encrypt(JSON.stringify(obj), TOKEN_SECRET)
  // const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

  setTokenCookie(res, token)
}

export async function getLoginSession(req) {
  const token = getTokenCookie(req)

  if (!token) return;

  // const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
  const session = JSON.parse(Buffer.from(cryptoJs.AES.decrypt(token, TOKEN_SECRET).toString(), "hex").toString("binary"))
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    return;
    //throw new Error('Session expired')
  }

  return session
}