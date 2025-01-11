import mongoose, { Schema } from "mongoose";
const statusEnum = ["ongoing", "Completed", "upcoming"];
const domainEnum = ["web",
  "app",
  "ai/ml",
  "game",
  "cybersecurity",
  "outreach",
  "competetive programming",];
const projectSchema = new Schema({
  header: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  clubId: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  Image: {
    type: String,

    required: true, 
  },
  link: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    enum: domainEnum,  
    required: true,  
  },
  status: {
    type: String,
    enum: statusEnum,  
    required: true,    
  },
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;
