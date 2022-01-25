import { NextResponse } from "next/server"

const isProduction = process.env.NODE_ENV === 'production'

export default function handle(req, res){
    if(isProduction && req.nextUrl.protocol == "http:"){
        return NextResponse.redirect(process.env.SECURE_REDIRECT_URL, 301)
    }

    return NextResponse.next()
}