import mongoose, { Schema } from "mongoose";

const aliasSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      lowercase: true, 
      trim: true,
      index: true,
    },

    password: {
      type: String,
      require: [true, "Password is required"],
    },
  },

  { timestamps: true }
);

export const Alias = mongoose.model("Alias", aliasSchema);
