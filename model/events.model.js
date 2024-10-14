import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  clubId: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
}, { timestamps: true });


const Event = mongoose.model("Event", eventSchema);
export default Event;
