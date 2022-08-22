import mongoose from "mongoose";

const voteSchema = mongoose.Schema(
  {
    election: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "election",
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "candidate",
    },
    voter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.model("vote", voteSchema);

export default Vote;
