import Event from "../model/events.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createEvent = asyncHandler(async (req, res) => {
  const clubId = req.club.clubId;
  const { name, description, date, time, venue } = req.body;

  const newEvent = await Event.create({
    name,
    description,
    date,
    time,
    venue,
    clubId,
  });

  if (!newEvent) {
    throw new apiError(500, "Error in creating event.");
  }

  return res
    .status(200)
    .json(new apiResponse(201, newEvent, "Event created successfully."));
});

export const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const trimmedId = id.trim();
  const { name, description, date, time, venue } = req.body;
  const event = await Event.findByIdAndUpdate(
    trimmedId,
    {
      name,
      description,
      date,
      time,
      venue,
    },
    { new: true }
  );
  if (!event) {
    throw new apiError(404, "Error in updating event.");
  }
  return res
    .status(200)
    .json(new apiResponse(201, event, "Event updated successfully."));
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const trimmedId = id.trim();
  const event = await Event.findByIdAndDelete(trimmedId);
  if (!event) {
    throw new apiError(404, "Error in deleting event.");
  }
  return res
    .status(200)
    .json(new apiResponse(201, event, "Event deleted successfully."));
});

export const getUpComingEvents = async (req, res) => {
  const upComingEvents = await Event.find().sort({ createdAt: -1 }).limit(3);
  if (!upComingEvents) {
    throw new apiError(404, "No events found.");
  }
  res
    .status(200)
    .json(
      new apiResponse(
        200,
        upComingEvents,
        "Upcoming events retrieved successfully."
      )
    );
};