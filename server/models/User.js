import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minLength: 6 },
    role: {
      type: String,
      default: "manager",
      enum: ["voter", "manager"],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema);

export default User;
