const express = require("express");

const orderProductRoute = express.Router();

const { BuyerProfileModel } = require("../Models/buyerProfile.model");
const { AddProductByFarmerModel } = require("../Models/addProductByFarmer.model");
const { FarmerProfileModel } = require("../Models/farmerProfile.model");
const { OrderProductModel } = require("../Models/orderProduct.model");
const { UserModel } = require("../Models/user.model");


orderProductRoute.get("/home", (req, res) => {
    res.json({ message: "This is home endpoint route from OrderProduct" });
});

module.exports = { orderProductRoute };
