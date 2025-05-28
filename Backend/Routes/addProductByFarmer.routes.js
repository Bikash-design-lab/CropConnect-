const express = require("express");

const addProductByFarmerRoute = express.Router();

const { AddProductByFarmerModel } = require("../Models/addProductByFarmer.model");
const { FarmerProfileModel } = require("../Models/farmerProfile.model");
const { UserModel } = require("../Models/user.model");

addProductByFarmerRoute.get("/home", (req, res) => {
    res.json({ message: "This is home endpoint from AddProductByFarmer" });
});

module.exports = { addProductByFarmerRoute };
