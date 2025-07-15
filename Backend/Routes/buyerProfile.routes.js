const express = require("express");

const buyerProfileRoute = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config()

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
        // console.log("USERID", userID)
        const role = req.role
        const user = await UserModel.findById(userID)
        // console.log(user)
        if (user.role != role || role != "buyer") {
            return res.status(404).json({ message: `Only users with the 'buyer' role can create a buyer profile.` })
        }
        // restrict from duplicate profile creation
        const isAlreadyCreatedProfile = await BuyerProfileModel.findOne({ userId: userID })
        if (isAlreadyCreatedProfile) {
            return res.status(409).json({ message: "Profile already exists. Duplicate profile creation is not allowed." });
        }

        const createBuyerProfile = await BuyerProfileModel.create({ userId: userID, ...req.body })

        // Implement NodeMailer so, that for every new order_buyer receive an Email, for confirmation of order
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: '"Mr. Bikash Prasad Barnwal" <Bikash@crop.connect.com>',
            to: user.email,
            subject: "✔ You have created a profile on CropConnect.",
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
                <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h2 style="color: #28a745;">🎉 Welcome to CropConnect!</h2>
                <p style="font-size: 16px;">Hello <b>${user.name}</b>,</p>
                <p style="font-size: 15px;">Your profile has been successfully created on <strong>CropConnect</strong>.</p>

                <hr style="margin: 20px 0;" />

                <h3 style="color: #333;">📄 Profile Details</h3>
                <p><b>🧑 Role:</b> Buyer</p>
                <p><b>🆔 Unique(Buyer) Profile ID:</b> ${createBuyerProfile._id}</p>
                <p><b>📞 Phone:</b> ${createBuyerProfile.phone}</p>
                <p><b>🏠 Address:</b> ${createBuyerProfile.address}</p>
                <p><b>📍 City :</b> ${createBuyerProfile.location.city}</p>
                <p><b>📍 State:</b> ${createBuyerProfile.location.state}</p>
                <p><b>🧾 Preferences:</b></p>
                <ul>
                    ${createBuyerProfile.preferences.map((ele) => `<li>${ele}</li>`).join("")}
                </ul>
                <p><b>🗓️ Profile Created At:</b> ${createBuyerProfile.createdAt}</p>

                <hr style="margin: 20px 0;" />
                <p style="font-size: 15px;">
                    We're excited to support your journey in agricultural trading. If you ever need help, don't hesitate to reach out.  
                    <br><br>
                    🌾 Thank you for choosing <strong>CropConnect</strong> — where farming meets technology!
                </p>

                <p style="margin-top: 30px; font-size: 14px; color: #888;">— Team CropConnect</p>
                </div>
            </div>
            `
        });

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
        return res.status(200).json({ message: `Hi ${user.name || 'N/A'}, it's your Buyer profile.`, getBuyerProfile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong.", error })
    }
})

module.exports = { buyerProfileRoute };
