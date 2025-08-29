// const mongoose = require("mongoose");

// const cartItemSchema = new mongoose.Schema(
//     {
//         productId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "AddProductByFarmer",
//             required: true
//         },
//         addedAt: { type: Date, default: Date.now },
//     },
//     { _id: false }
// );

// const addToCartSchema = new mongoose.Schema(
//     {
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: true,
//         },
//         products: [cartItemSchema],
//     },
//     { timestamps: true, versionKey: false }
// );

// const addToCartModel = mongoose.model("AddToCart", addToCartSchema);  // Renamed for consistency
// module.exports = { addToCartModel };  // Export as object

const mongoose = require("mongoose");


const addToCartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [{
            _id: false,
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AddProductByFarmer", // prefers to the product model name
                required: true
            },
            addedAt: { type: Date, default: Date.now }
        }]
    },
    { timestamps: true, versionKey: false }
);

const cartItemModel = mongoose.model("AddToCart", addToCartSchema);
module.exports = { cartItemModel };

