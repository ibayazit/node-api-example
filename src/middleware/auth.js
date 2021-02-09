const jwt = require('jsonwebtoken')

const config = require('../utils/config')

module.exports.isAuthorized = (req, res, next) => {
    if(!req.headers.authorization || !req.headers.authorization.length)
        res.sendStatus(401)

    const authHeader = req.headers.authorization.split(' ')

    if(authHeader && authHeader.length){
        jwt.verify(authHeader[1], config.app.key, (err, user) => {
            if(err)
                res.sendStatus(403)

            req.user = user

            next()
        })
    } else{
        res.sendStatus(401)
    }
}