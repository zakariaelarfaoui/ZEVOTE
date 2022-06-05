import mongoose from "mongoose";

const electionSchema = mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 6 },
    description: { type: String, required: true, minLength: 20 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      default: "pending",
      enum: ["finished", "pending", "ongoing"],
    },
    candidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "candidate",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Election = mongoose.model("election", electionSchema);

export default Election;
