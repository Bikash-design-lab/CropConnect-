const jwt = require("jsonwebtoken")

const { BlacklistedTokenModel } = require("../Models/blacklistedToken.model")

const Authentication = (roles) => {
    return async (req, res, next) => {
        try {

            const token = await req.headers?.authorization?.split(" ")[1]
            if (!token) {
                return res.status(404).json({ message: "Token not found." })
            }
            const isBlackListedTokn = await BlacklistedTokenModel.findOne({ token })
            if (isBlackListedTokn) {
                return res.status(401).json({ message: "It's BlackListed Token, Please Login again." })
            }
            const decoded = jwt.verify(token, process.env.SECURED_KEY)
            if (!decoded) {
                return res.status(404).json({ message: "Unauthorized" })
            }
            if (!roles && decoded.roles(req.role)) {
                return res.json({ message: "User Roles not match." });
            }
            req.userID = decoded.userID;
            req.role = decoded.role;
            next();
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ message: "An unexpected error occurred. Please try again later.", error })
        }
    }
}

module.exports = { Authentication }