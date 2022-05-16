import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 3 },
    lastName: { type: String, required: true, min: 3 },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["admin", "candidate", "voter"],
      default: "voter",
    },
    password: { type: String, required: true, min: 8 },
    active: { type: Boolean, default: false },
    refreshToken: { type: String, default: null },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
const User = mongoose.model("user", userSchema);

export default User;
