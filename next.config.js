module.exports = {
  reactStrictMode: true,
  async rewrites(){
    return [
      {
        source: "/:path*",
        destination: "/pretty/:path*"
      }
    ]
  }
}
