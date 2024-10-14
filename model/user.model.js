import mongoose, { Schema } from "mongoose";
import { hashSaltRound, skillsArrayLimit } from "../constants/constant.js";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    fullName: {
      type: String,
      required: true,
      trim: [true, "full name is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender box can't be empty"],
    },
    role: {
      type: String,
      enum: ["Member", "Assistant coordinator", "Coordinator"],
      default: "user",
    },
    yearOfGraduation: {
      type: Number,
      required: [true, "choose an year of graduation "],
    },
    clubId: {
      type: Schema.Types.ObjectId,
      ref: "Club",
      required: [true, "you must be a club member to register"],
    },
    domain: {
      type: [String],
      enum: [
        "web",
        "app",
        "ai/ml",
        "game",
        "cybersecurity",
        "outreach",
        "competetive programming",
      ],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "Domain field must have at least one value.",
      },
      trim: true,
    },
    photo: {
      url: String,
    },
    skills: {
      type: [String],
      validate: {
        validator: (value) => value.length <= skillsArrayLimit,
        message: "exceeds the limit of 7",
      },
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
    githubLink: {
      type: String,
      trim: true,
    },
    linkedinLink: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(hashSaltRound);
  this.password = bcrypt.hash(this.password, salt);
  next();
});

export const User = mongoose.model("User", userSchema);
