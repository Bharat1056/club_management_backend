import mongoose, { Schema } from "mongoose";
import { higherMemberLimit } from "../constants/constant.js";

const baseSchema = new Schema({
  type: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
  },
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
      required: [true, "Faculty Advisor name is required"],
      trim: true,
    },
    coordinator: {
      type: [baseSchema], 
      required: true,
      validate: {
        validator: (value) => value.length <= higherMemberLimit, 
        message: "Exceed the higher member limit of 2",
      },
    },
    assistantCoordinator: {
      type: [baseSchema],
      required: true,
      validate: {
        validator: (value) => value.length <= higherMemberLimit, 
        message: "Exceed the higher member limit of 2",
      },
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
