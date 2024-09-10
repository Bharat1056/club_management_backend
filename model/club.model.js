import mongoose, { Schema } from "mongoose";
import { User } from "./user.model";
import { higherMemberLimit } from "../constants/constant";

const baseSchema = new Schema({
  type: Schema.Types.ObjectId,
  ref: "User",
});

const clubSchema = new Schema(
  {
    clubName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    achievements: {
      type: [String],
      trim: true,
    },
    facultyAdvisor: {
      type: String,
      required: true,
      trim: true,
      required: [true, "Faculty Advisor name is required"],
    },
    coordinator: {
      type: [baseSchema],
      required: true,
      trim: true,
      validate: [higherMemberLimit, "Exceed the higher member limit of 2"],
    },
    assistantCoordinator: {
      type: [baseSchema],
      required: true,
      trim: true,
      validate: [higherMemberLimit, "Exceed the higher member limit of 2"],
    },
    members: [baseSchema],
  },

  { timestamps: true }
);

clubSchema.pre(/^(find|findOne)/, function () {
  this.populate("coordinator");
  this.populate("assistantCoordinator");
});

export const Club = mongoose.model("Club", clubSchema);
