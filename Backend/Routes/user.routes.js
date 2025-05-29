const express = require("express");

const userRoute = express.Router();

const { UserModel } = require("../Models/user.model");
const { BlacklistedTokenModel } = require("../Models/blacklistedToken.model")

const jwt = require("jsonwebtoken")
const { Authentication } = require("../Middlewares/auth.middleware")

// healthy test endpoint
userRoute.get("/home", (req, res) => {
  res.json({ message: "This is home endpoint route." });
});

// user signup
userRoute.post("/signup", async (req, res) => {
  try {

    const isUser = await UserModel.findOne({ email: req.body.email })
    if (isUser) {
      return res.status(409).json({ message: "User already registered. Please sign in to continue." })
    }
    const user = await UserModel.create({ ...req.body })
    return res.status(200).json({ message: "Signup successful! Welcome aboard.", user })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later.", error })
  }
})

// user signin
userRoute.post("/signin", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email, password: req.body.password })
    if (!user) {
      return res.status(409).json({ message: "No account found with this email. Please sign up first." })
    }
    const token = jwt.sign({ userID: user._id, role: user.role }, process.env.SECURED_KEY)
    return res.status(200).json({ message: "Signin successful! Welcome back.", user, token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later.", error })
  }
})

// user logout
userRoute.post("/logout", Authentication(["farmer", "buyer", "admin"]), async (req, res) => {
  try {
    const userID = req.userID
    const role = req.role
    const user = await UserModel.findById(userID)
    if (!user) {
      return res.status(409).json({ message: "No account found with this userID." })
    }
    const token = req.headers?.authorization?.split(" ")[1];
    await BlacklistedTokenModel.create({ token });
    // console.log(token)
    // console.log(userID, role)
    return res.status(200).json({ message: "Logout sucessfull." })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later.", error })
  }
})

// test middleware working
userRoute.get("/checkMW", Authentication(["farmer", "buyer", "admin"]), async (req, res) => {
  try {
    const userID = req.userID
    const role = req.role
    // console.log(userID, role)
    const user = await UserModel.findById(userID)
    if (!user) {
      return res.status(409).json({ message: "No account found with this userID." })
    }
    return res.status(200).json({ message: "User found successful.", user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later.", error })
  }
})

module.exports = { userRoute };
