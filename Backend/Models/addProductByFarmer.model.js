const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FarmerProfile",
      required: true,
    },
    name: { type: String, required: true },
    variety: { type: String },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["vegetable", "fruit", "grain", "pulse", "herb", "spice", "other"],
      required: true,
      default: "grain",
    },
    pricePerUnit: { type: Number, required: true },
    unit: { type: String, default: "kg" },
    quantityAvailable: { type: Number, required: true },
    images: [String],
    isOrganic: { type: Boolean, default: false },
    isCertified: { type: Boolean, default: false },
    certificationDetails: {
      authority: String,
      certificateNumber: String,
      certifiedOn: Date,
    },
    harvestDate: { type: Date },
    expiryDate: { type: Date },
    location: {
      city: String,
      state: String,
      pin: String,
      coordinates: {
        type: { type: String, default: "Point" },
        coordinates: [Number],
      },
    },
    deliveryAvailable: { type: Boolean, default: false },
    deliveryRadiusKm: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["available", "out_of_stock", "unavailable"],
      default: "available",
    },
    ratings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        review: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

ProductSchema.index({ "location.coordinates": "2dsphere" });

const AddProductByFarmerModel = mongoose.model(
  "AddProductByFarmer",
  ProductSchema
);
module.exports = { AddProductByFarmerModel };
