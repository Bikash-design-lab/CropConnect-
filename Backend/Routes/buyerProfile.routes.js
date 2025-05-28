const express = require("express");

const buyerProfileRoute = express.Router();

const { BuyerProfileModel } = require("../Models/buyerProfile.model");
const { UserModel } = require("../Models/user.model");


buyerProfileRoute.get("/home", (req, res) => {
    res.json({ message: "This is home endpoint route from BuyerProfile " });
});

module.exports = { buyerProfileRoute };
