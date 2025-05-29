const express = require("express");

const orderProductRoute = express.Router();

const { BuyerProfileModel } = require("../Models/buyerProfile.model");
const { AddProductByFarmerModel } = require("../Models/addProductByFarmer.model");
const { FarmerProfileModel } = require("../Models/farmerProfile.model");
const { OrderProductModel } = require("../Models/orderProduct.model");
const { UserModel } = require("../Models/user.model");


// middleware
const { Authentication } = require("../Middlewares/auth.middleware")

// healthy test for endponit working
orderProductRoute.get("/home", (req, res) => {
    res.json({ message: "This is home endpoint route from OrderProduct" });
});

// Place order for a  order_product endpoint
// Endpoint: /orderProduct?buyerId=buyerId&farmerId=farmerId&productId=productId
orderProductRoute.post("/orderProduct", Authentication(["buyer", "admin"]), async (req, res) => {
    try {
        const userID = req.userID;
        const role = req.role;
        const { buyerId, farmerId, productId } = req.query;

        const user = await UserModel.findById(userID);

        if (user.role !== role || (role !== "buyer" && role !== "admin")) {
            return res.status(403).json({ message: `Access denied: Only users with the 'buyer' role are allowed to place an order.` });
        }

        if (!buyerId || !farmerId || !productId) {
            return res.status(400).json({ message: "Missing required identifiers: buyerId, farmerId, or productId." });
        }

        const isProductExists = await AddProductByFarmerModel.findById(productId);
        if (!isProductExists) {
            return res.status(404).json({
                message: `Hello ${user.role.toUpperCase()} ${user.name}, the product with ID '${productId}' is no longer available on the platform.`,
            });
        }

        if (req.body.quantity > isProductExists.quantityAvailable) {
            return res.status(400).json({
                message: `Insufficient stock: Only ${isProductExists.quantityAvailable} ${isProductExists.unit} available for purchase.`,
            });
        }

        const buyProduct = await OrderProductModel.create({ buyerId, farmerId, productId, ...req.body, });

        return res.status(200).json({ message: "Your order has been successfully placed.", buyProduct, });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An unexpected error occurred while placing the order.", error });
    }
});

// Update order for a order_product endpoint
// Endpoint: /updateProduct?orderId=_id
orderProductRoute.patch("/updateProduct", Authentication(["buyer", "admin"]), async (req, res) => {
    try {
        const userID = req.userID;
        const role = req.role;
        const { orderId } = req.query;

        if (!orderId) {
            return res.status(400).json({ message: "Missing required parameter: orderId." });
        }

        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (role !== "buyer" && role !== "admin") {
            return res.status(403).json({
                message: "Access denied: Only users with 'buyer' or 'admin' roles can update an order.",
            });
        }

        const isOrderExists = await OrderProductModel.findById(orderId);
        if (!isOrderExists) {
            return res.status(404).json({
                message: `Hello ${user.role.toUpperCase()} ${user.name}, the Order with ID '${orderId}' is no longer available on the platform.`,
            });
        }

        const orderedProduct = await OrderProductModel.findOneAndUpdate({ _id: orderId }, { ...req.body }, { new: true });

        return res.status(200).json({ message: "Your order has been updated successfully.", orderedProduct, });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An unexpected error occurred while placing the order.", error });
    }
});


// delete order for a  order_product endpoint
// Endpoint: /cancelOrder?orderId=_id
orderProductRoute.delete("/cancelOrder", Authentication(["buyer", "admin"]), async (req, res) => {
    try {
        const userID = req.userID;
        const role = req.role;
        const { orderId } = req.query;

        if (!orderId) {
            return res.status(400).json({ message: "Missing required parameter: orderId." });
        }

        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (role !== "buyer" && role !== "admin") {
            return res.status(403).json({
                message: "Access denied: Only users with 'buyer' or 'admin' roles can update an order.",
            });
        }

        const isOrderExists = await OrderProductModel.findById(orderId);
        if (!isOrderExists) {
            return res.status(404).json({
                message: `Hello ${user.role.toUpperCase()} ${user.name}, the Order with ID '${orderId}' is no longer available on the platform.`,
            });
        }

        const orderedProduct = await OrderProductModel.findOneAndUpdate({ _id: orderId });

        return res.status(200).json({ message: `Hello ${user.role.toUpperCase()} ${user.name}, the Order with ID '${orderId}' is cancelled sucssfully. `, orderedProduct, });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An unexpected error occurred while placing the order.", error });
    }
});


// get order for a  order_product endpoint
// Endpoint: /getOrderedProduct
orderProductRoute.get("/getOrderedProduct", Authentication(["buyer", "admin"]), async (req, res) => {
    try {
        const userID = req.userID;
        const role = req.role;

        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (role !== "buyer" && role !== "admin") {
            return res.status(403).json({
                message: "Access denied: Only users with 'buyer' or 'admin' roles can update an order.",
            });
        }

        const orderedProduct = await OrderProductModel.find();
        if (orderedProduct.length == 0) {
            return res.status(200).json({
                message: `Hello ${user.role.toUpperCase()} ${user.name}, your haven't place any order.`,
            });
        }
        return res.status(200).json({ message: "Your ordered product lists.", orderedProduct, });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An unexpected error occurred while getting the ordered product list.", error });
    }
});

module.exports = { orderProductRoute };
