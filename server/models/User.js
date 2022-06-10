import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 6 },
    email: { type: String, required: true, minLength: 6 },
    password: { type: String, required: true, minLength: 6 },
    role: {
      type: String,
      default: "voter",
      enum: ["admin", "candidate", "voter", "manager"],
    },
    active: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema);

export default User;
