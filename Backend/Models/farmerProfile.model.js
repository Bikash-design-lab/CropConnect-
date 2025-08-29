const mongoose = require("mongoose");

const FarmerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    phone: { type: Number },
    location: {
      city: String,
      state: String,
      pin: String,
      coordinates: {
        type: { type: String, default: "Point" },
        coordinates: [Number], // [lng, lat]
      },
    },
    farmSize: Number,
    isCertifiedSustainable: { type: Boolean, default: false },
    certificationDetails: {
      authority: String,
      certifiedOn: Date,
      documents: [String],
    },
  },
  { versionKey: false, timestamps: true }
);

FarmerProfileSchema.index({ "location.coordinates": "2dsphere" });

const FarmerProfileModel = mongoose.model("FarmerProfile", FarmerProfileSchema);
module.exports = { FarmerProfileModel };
