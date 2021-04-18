const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../Keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")


module.exports = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.json({ error: "you must be logged in" })
    }
    // authorization = Bearer jwheu23239 (i.e. token)
    const token = authorization.replace("Bearer ", "")

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.json({ error: " logged in" })
        }
        const { _id } = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
            next();
        })
    })

}

