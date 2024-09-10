import mongoose, { Schema } from "mongoose";
import { hashSaltRound, skillsArrayLimit } from "../constants/constant";
import bcrypt from 'bcrypt'

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
      enum: ["user", "admin", "authority"],
      default: "user",
    },
    yearOfGraduation: {
      type: Number,
      required: [true, "choose an year of graduation "],
    },
    club: {
      type: Schema.Types.ObjectId,
      ref: "Club",
      required: [true, "you must be a club member to register"],
    },
    domain: {
      type: String,
      trim: true,
    },
    photo: {
      url: String,
    },
    skills: {
      type: [String],
      validate: [skillsArrayLimit, "exceeds the limit of 7"],
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

userSchema.pre(/^(find|findOne)/, function () {
  this.populate("club");
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  const salt = await bcrypt.genSalt(hashSaltRound);
  this.password = bcrypt.hash(this.password, salt)
  next()
})

export const User = mongoose.model("User", userSchema);
