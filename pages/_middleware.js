import { NextResponse } from "next/server"

const isProduction = process.env.NODE_ENV === 'production'

export default function handle(req, res){
    if(isProduction && req.nextUrl.protocol == "http:"){
        return NextResponse.redirect(req.nextUrl.href.replace(/^http/, "https"), 301)
    }

    return NextResponse.next()
}