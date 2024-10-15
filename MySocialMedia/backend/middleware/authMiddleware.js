
const jwt = require('jsonwebtoken')
const authMiddleware = async (req, res, next) => {
    try {




        const token = req.cookies.jwt
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if (err) {
                    res.status(401).json({ message: "Unauthorized" })
                }
                else {
                    next()
                }
            })
        }



    } catch (error) {
        res.status(401).json({ message: "Unauthorized" })
    }

}
module.exports = { authMiddleware }