const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.status(401).send({ message: "Auth failed" })
    }
    let token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({ message: "Auth failed" })
        } else {
            next()
        }

    })
}

module.exports = verifyToken