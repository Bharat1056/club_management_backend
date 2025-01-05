import Achievement from "../model/achievements.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";

export const createAchievement = asyncHandler(async (req, res) => {
  const clubId = req.club._id;
  const { header, description } = req.body;

  const newAchievement = await Achievement.create({
    header,
    description,
    clubId,
  });

  if (!newAchievement) {
    throw new apiError(500, "Error in creating achievement.");
  }

  return res
    .status(200)
    .json(
      new apiResponse(201, newAchievement, "Achievement created successfully.")
    );
});

export const updateAchievement = asyncHandler(async (req, res) => {
  const clubId = req.club._id;
  const { id } = req.params;
  const trimmedId = id.trim();
  const { header, description } = req.body;
  const achievement = await Achievement.findByIdAndUpdate(trimmedId, {
    header,
    description,
    clubId,
  });
  if (!achievement) {
    throw new apiError(404, "Error in updating achievement.");
  }
  return res
    .status(200)
    .json(
      new apiResponse(200, achievement, "Achievement updated successfully")
    );
});

export const deleteAchievement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const trimmedId = id.trim();
  const achievement = await Achievement.findByIdAndDelete(trimmedId);
  if (!achievement) {
    throw new apiError(404, "Error in deleting achievement.");
  }
  return res
    .status(200)
    .json(
      new apiResponse(200, achievement, "Achievement deleted successfully.")
    );
});

export const getUpComingAchievements = asyncHandler(async (req, res) => {
  const upComingAchievements = await Achievement.find()
    .sort({ createdAt: -1 })
    .limit(3);
  if (!upComingAchievements) {
    throw new apiError(404, [], "There is no achievement in this club.");
  }
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        upComingAchievements,
        "Upcoming achievements retrieved successfully."
      )
    );
});
