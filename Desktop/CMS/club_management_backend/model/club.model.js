import mongoose, { Schema } from "mongoose";

const clubSchema = new Schema(
  {
    clubName: {
        type: String,
        required: true,
        trim: true,
        unique: true 
      },
      achievements: {
        type: [String],
        trim: true
      },
      facultyAdvisor: {
        type: String,
        required: true,
        trim: true,
        required: [true, "Faculty Advisor name is required"]
      },
      coordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: [true, "Coordinator(s) name is required"]
      },
      assistantCoordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required:  [true, "Assistant Coordinator(s) name is required"] 
      },
      members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  
      }],
  },

  { timestamps: true }
);

export const Club = mongoose.model("Club", clubSchema);
