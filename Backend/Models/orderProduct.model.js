const mongoose = require("mongoose");

const OrderProductSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BuyerProfile",
      required: true,
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FarmerProfile",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddProductByFarmer",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unit: {
      type: String,
      default: "kg",
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "dispatched", "delivered", "cancelled"],
      default: "pending",
    },

    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      pin: String,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const OrderProductModel = mongoose.model("OrderProduct", OrderProductSchema);
module.exports = { OrderProductModel };
