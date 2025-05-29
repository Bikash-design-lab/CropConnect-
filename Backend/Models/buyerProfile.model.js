const mongoose = require("mongoose");

const BuyerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  preferences: { type: [String], required: true }, // e.g., ["Organic", "Local"]
  location: {
    city: { type: String },
    state: { type: String },
    coordinates: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },
  },
}, {
  versionKey: false,
  timestamps: true,
});

BuyerProfileSchema.index({ "location.coordinates": "2dsphere" });

const BuyerProfileModel = mongoose.model("BuyerProfile", BuyerProfileSchema);
module.exports = { BuyerProfileModel };
