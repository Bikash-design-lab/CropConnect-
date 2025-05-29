const mongoose = require("mongoose")

const BlacklistedTokenSchema = mongoose.Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 7, } // 7 days in seconds
})

const BlacklistedTokenModel = mongoose.model("BlacklistedToken", BlacklistedTokenSchema)

module.exports = { BlacklistedTokenModel }