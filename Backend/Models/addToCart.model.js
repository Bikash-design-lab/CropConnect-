const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AddProductByFarmer", // Or your Product model name
            required: true, unique: true
        },
        addedAt: { type: Date, default: Date.now },
    },
    { _id: false } // Prevents auto-generating _id for each sub-document
);

const addToCartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [cartItemSchema], // Array of cart items
    },
    { timestamps: true, versionKey: false }
);

const cartItemModel = mongoose.model("AddToCart", addToCartSchema);
module.exports = cartItemModel;