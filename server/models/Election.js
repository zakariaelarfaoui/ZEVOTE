import mongoose from "mongoose";

const electionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      default: "pending",
      enum: ["open", "pending", "closed"],
    },
    candidates: [
      {
        name: { type: String, required: true },
        info: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    voters: [{ _id: { type: mongoose.Schema.Types.ObjectId, ref: "user" } }],
    manager_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);
const Election = mongoose.model("election", electionSchema);

export default Election;
