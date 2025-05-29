const express = require("express");

const farmerProfileRouter = express.Router();

const { FarmerProfileModel } = require("../Models/farmerProfile.model");
const { UserModel } = require("../Models/user.model");

// middleware
const { Authentication } = require("../Middlewares/auth.middleware")

farmerProfileRouter.get("/home", (req, res) => {
    res.json({ message: "This is home endpoint route from FarmerProfile." });
});

farmerProfileRouter.post("/add-farmerProfile", Authentication(["farmer"]), async (req, res) => {
    try {
        const userID = req.userID
        const role = req.role
        const user = await UserModel.findById(userID)
        if (user.role != role || role != "farmer") {
            return res.status(404).json({ message: `Only users with the 'farmer' role can create a farmer profile.` })
        }
        const createFarmerProfile = await FarmerProfileModel.create({ userId: userID, ...req.body })
        return res.status(200).json({ message: `Hi ${user.name}, your farmer profile has been created successfully!`, createFarmerProfile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong.", error })
    }
})

farmerProfileRouter.patch("/update-farmerProfile", Authentication(["farmer"]), async (req, res) => {
    try {
        const userID = req.userID
        const role = req.role
        const user = await UserModel.findById(userID)
        if (user.role != role || role != "farmer") {
            return res.status(404).json({ message: `Only users with the 'farmer' role can create a farmer profile.` })
        }
        const updateFarmerProfile = await FarmerProfileModel.findOneAndUpdate({ userId: userID }, { userId: userID, ...req.body }, { new: true })
        return res.status(200).json({ message: `Hi ${user.name}, your farmer profile has been updated successfully!`, updateFarmerProfile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong.", error })
    }
})

farmerProfileRouter.get("/get-farmerProfile", Authentication(["farmer"]), async (req, res) => {
    try {
        const userID = req.userID
        const role = req.role
        const user = await UserModel.findById(userID)
        if (user.role != role || role != "farmer") {
            return res.status(404).json({ message: `Only users with the 'farmer' role able to access this profile.` })
        }
        const getFarmerProfile = await FarmerProfileModel.find()
        return res.status(200).json({ message: `Hi ${user.name}, it's your Farmer profile.`, getFarmerProfile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong.", error })
    }
})

module.exports = { farmerProfileRouter };
