import { NextResponse } from "next/server"

const isProduction = process.env.NODE_ENV === 'production'

export default function handle(req, res){
    if(isProduction && req.headers.get("x-forwarded-proto") !== "https"){
        return NextResponse.redirect(`https://${req.nextUrl.hostname}${req.nextUrl.pathname}`, 301)
    }

    return NextResponse.next()
}