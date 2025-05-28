const express = require("express");

const userRoute = express.Router();

const { UserModel } = require("../Models/user.model");

userRoute.get("/home", (req, res) => {
  res.json({ message: "This is home endpoint route." });
});

// userRoute.post("/signup",async(req,res)=>{

// })

module.exports = { userRoute };
