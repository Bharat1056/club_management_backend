import mongoose, { Schema } from "mongoose";


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

    password: {
      type: String,
      require: [true, "Password is required"],
    },
    fullName: {
      type: String,
      required: true,
      trim: [true, "full name is required"]
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required:[true, "Gender box can't be empty"]

    },

    // year: {
    //   type: Number,
    //   required: true,
    //   min: 1,  
    //   max: 5  
    // },  
   
    yearOfGraduation: {
      type: Number,
      required: [true, "choose an year of graduation "]
      
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',  
      required: [true, "you must be a club member to register"]
    },
    domain: {
      type: String,
      required: false,
      trim: true
    },
    photo: {
      url: String, 
      required: false
    },
    skills: {
      type: [String], 
      validate: [arrayLimit, 'exceeds the limit of 7']  
    },

  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
