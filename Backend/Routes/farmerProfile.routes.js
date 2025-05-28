const express = require("express");

const farmerProfileRouter = express.Router();

const { FarmerProfileModel } = require("../Models/farmerProfile.model");
const { UserModel } = require("../Models/user.model");

farmerProfileRouter.get("/home", (req, res) => {
    res.json({ message: "This is home endpoint route from FarmerProfile." });
});

module.exports = { farmerProfileRouter };
