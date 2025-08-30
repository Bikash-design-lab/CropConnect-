const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, min: 4, required: true },
    role: {
      type: String,
      enum: ["farmer", "admin", "buyer"],
      default: "farmer",
    }
  },
  { versionKey: false, timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };

UserModel.createIndexes({ email: 1 }); // Ensure email is indexed for faster queries
UserModel.createIndexes({ email: 1, role: 1 }, { unique: true }); // Ensure unique email-role combination
