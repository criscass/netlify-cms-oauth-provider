const randomstring = require('randomstring')

module.exports = (oauth2) => {
  return (req, res, next) => {
    const forwardedProto = req.headers['x-forwarded-proto'] || 'https'
    const forwardedHost = req.headers['x-forwarded-host'] || req.headers.host
    const dynamicRedirect = `${forwardedProto}://${forwardedHost}/callback`
    const redirectURI = process.env.REDIRECT_URL || dynamicRedirect

    const authorizationUri = oauth2.authorizeURL({
      redirectURI,
      scope: process.env.SCOPES || 'repo,user',
      state: randomstring.generate(32)
    })

    res.redirect(authorizationUri)
  }
}
