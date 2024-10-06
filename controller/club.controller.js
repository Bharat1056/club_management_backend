import { Club } from "../model/club.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"

export const createClub = asyncHandler(async (req, res) => {
      // add your own logic here
      const { clubName, achievements, facultyAdvisor, coordinator, assistantCoordinator, members } = req.body;
    // Validation
    let validationErrors = [];
      if (!clubName) validationErrors.push("clubName is required.");
      if (!facultyAdvisor) validationErrors.push(" facultyAdvisor is required.");
      if (!coordinator) validationErrors.push("coordinator is required.");
      if (! assistantCoordinator) validationErrors.push(" assistantCoordinator is required.");
      if (validationErrors.length > 0) {
          throw new apiError(400, validationErrors.join(" "));
      }
    const club = new Club({
        clubName,
        achievements,
        facultyAdvisor,
        coordinator,
        assistantCoordinator,
        members
    });
    await club.save();
    res.status(201).json(new apiResponse(201, club, "Club created successfully."));
});

export const getAllClubs = asyncHandler(async (req, res) => {
      // add your own logic here 
      const clubs = await Club.find();
      res.status(200).json(new apiResponse(200, clubs, "Clubs retrieved successfully."));

});

export const getOneClub = asyncHandler(async (req, res) => {
      // add your own logic here
      const { id } = req.params;
      const trimmedId = id.trim();
      const club = await Club.findById(trimmedId);
      if (!club) {
          throw new apiError(404, "Club not found.");
      }
      res.status(200).json(new apiResponse(200, club, "Club retrieved successfully."));

});

export const updateClub = asyncHandler(async (req, res) => {
      // add your own logic here
      const { id } = req.params;
      const trimmedId = id.trim();
      const updates = req.body;
      const updatedClub = await Club.findByIdAndUpdate(trimmedId, updates, {
          new: true,
          runValidators: true
      });
      if (!updatedClub) {
          throw new apiError(404, "Club not found.");
      }
      res.status(200).json(new apiResponse(200, updatedClub, "Club updated successfully."));

});

export const deleteClub = asyncHandler(async (req, res) => {
      // add your own logic here
      const { id } = req.params;
      const trimmedId = id.trim();
      const deletedClub = await Club.findByIdAndDelete(trimmedId);
      if (!deletedClub) {
          throw new apiError(404, "Club not found.");
      }
      res.status(200).json(new apiResponse(200, null, "Club deleted successfully."));

});
