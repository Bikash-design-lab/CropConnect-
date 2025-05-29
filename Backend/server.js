const express = require("express");

const app = express();
require("dotenv").config();
const cors = require("cors")

const PORT = 8080 || process.env.PORT;

// calling ConnectToDB fuction database
const { ConnectToDB } = require("./Config/db");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 25, // Limit each IP to 25 requests per windowMs
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});


// different endpoint routes
const { userRoute } = require("./Routes/user.routes");
const { farmerProfileRouter } = require("./Routes/farmerProfile.routes");
const { buyerProfileRoute } = require("./Routes/buyerProfile.routes");
const { orderProductRoute } = require("./Routes/orderProduct.routes");
const { addProductByFarmerRoute } = require("./Routes/addProductByFarmer.routes");

// Middlewares -> JSON to parse data
app.use(express.json());
app.use(cors())
app.use(limiter)

app.get("/test", (req, res) => {
  res.json({ message: "This is test endpoint." });
});

// user router
app.use("/user", userRoute);

// Login user create profile: farmerProfile, role_login:farmer
app.use("/farmerProfile", farmerProfileRouter);

// Login user create profile: buyerProfile, role_login:buyer
app.use("/buyerProfile", buyerProfileRoute);

// add new product by farmer for available to sell
app.use("/addProductByFarmer", addProductByFarmerRoute);

// place order of product/crop by buyer's only
app.use("/orderProduct", orderProductRoute);

app.listen(PORT, () => {
  ConnectToDB();
  console.log("Server Started:", PORT);
});
