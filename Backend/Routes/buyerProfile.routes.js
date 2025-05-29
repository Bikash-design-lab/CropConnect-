const express = require("express");

const buyerProfileRoute = express.Router();

const { BuyerProfileModel } = require("../Models/buyerProfile.model");
const { UserModel } = require("../Models/user.model");

// middleware
const { Authentication } = require("../Middlewares/auth.middleware")

buyerProfileRoute.get("/home", (req, res) => {
    res.json({ message: "This is home endpoint route from BuyerProfile " });
});

// create buyers profile new
buyerProfileRoute.post("/add-buyerProfile", Authentication(["buyer"]), async (req, res) => {
    try {
        const userID = req.userID
        const role = req.role
        const user = await UserModel.findById(userID)
        if (user.role != role || role != "buyer") {
            return res.status(404).json({ message: `Only users with the 'buyer' role can create a buyer profile.` })
        }
        const createBuyerProfile = await BuyerProfileModel.create({ userId: userID, ...req.body })
        return res.status(200).json({ message: `Hi ${user.name}, your Buyer's profile has been created successfully!`, createBuyerProfile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong.", error })
    }
})

// patch buyers profile
buyerProfileRoute.patch("/update-buyerProfile", Authentication(["buyer"]), async (req, res) => {
    try {
        const userID = req.userID
        const role = req.role
        const user = await UserModel.findById(userID)
        if (user.role != role || role != "buyer") {
            return res.status(404).json({ message: `Only users with the 'buyer' role can create a buyer profile.` })
        }
        const updateBuyerProfile = await BuyerProfileModel.findOneAndUpdate({ userId: userID }, { ...req.body }, { new: true })
        return res.status(200).json({ message: `Hi ${user.name}, your Buyer's profile has been updated successfully!`, updateBuyerProfile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong.", error })
    }
})

// get buyers proile
buyerProfileRoute.get("/get-buyerProfile", Authentication(["buyer"]), async (req, res) => {
    try {
        const userID = req.userID
        const role = req.role
        const user = await UserModel.findById(userID)
        if (user.role != role || role != "buyer") {
            return res.status(404).json({ message: `Only users with the 'buyer' role can create a buyer profile.` })
        }
        const getBuyerProfile = await BuyerProfileModel.find()
        return res.status(200).json({ message: `Hi ${user.name}, it's your Buyer profile.`, getBuyerProfile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong.", error })
    }
})

module.exports = { buyerProfileRoute };
