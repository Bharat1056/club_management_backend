import { Club } from "../model/club.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { User } from "../model/user.model.js";
import emptyFieldValidation from "../helper/emptyFieldValidation.js";

// POST
export const createClub = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  const {
    clubName,
    achievements,
    clubDescription,
    clubLogo,
    facultyAdvisor,
    coordinator,
    assistantCoordinator,
    members,
  } = req.body;
  // Empty field Validation
  emptyFieldValidation([
    clubName,
    achievements,
    facultyAdvisor,
    coordinator,
    assistantCoordinator,
    clubDescription,
    clubLogo,
    members,
  ]);
  const club = new Club({
    clubName,
    achievements,
    facultyAdvisor,
    coordinator, // name
    assistantCoordinator, // name
    members,
  });
  await club.save();
  return res
    .status(201)
    .json(new apiResponse(201, club, "Club created successfully."));
});

// GET
export const getAllClubs = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const clubs = await Club.find({ type: type.trim() });
  res
    .status(200)
    .json(new apiResponse(200, clubs, "Clubs retrieved successfully."));
});

// GET
export const getOneClub = asyncHandler(async (req, res) => {
  const { id } = req.params; // club id
  const trimmedId = id.trim();
  const club = await Club.findById(trimmedId);
  if (!club) {
    throw new apiError(404, "Club not found.");
  }
  res.status(200).json(
    new apiResponse(
      200,
      {
        clubName: club.clubName,
        clubLogo: club.clubLogo,
        clubId: club._id,
        clubDescription: club.clubDescription,
      },
      "Club retrieved successfully."
    )
  );
});

// GET
export const getClubEvent = asyncHandler(async (req, res) => {
  const { count, offset, limit, data } = req.paginate;

  if (data.length === 0) {
    throw new apiError(404, "There is no event in this club.");
  }
  res
    .status(200)
    .json(
      new apiResponse(
        200,
        { count, offset, limit, data },
        "Club Event retrieved successfully."
      )
    );
});

// GET
export const getClubMember = asyncHandler(async (req, res) => {
  const { id } = req.params; // club id
  const trimmedId = id.trim();
  const club = await Club.findById(trimmedId);
  if (!club) {
    throw new apiError(404, "Club not found.");
  }
  res
    .status(200)
    .json(
      new apiResponse(200, club.members, "Club Member retrieved successfully.")
    );
});

// GET
export const getClubAchievements = asyncHandler(async (req, res) => {
  const { count, limit, offset, data } = req.paginate;
  if (data.length === 0) {
    throw new apiError(404, [], "There is no achievement in this club.");
  }
  res
    .status(200)
    .json(
      new apiResponse(
        200,
        { count, offset, limit, data },
        "Club Achievements retrieved successfully."
      )
    );
});

// PUT
export const updateClub = asyncHandler(async (req, res) => {
  const updates = req.body;

  const targetedClub = req.club;
  const clubId = targetedClub._id;

  const updatedClub = await Club.findByIdAndUpdate(clubId, updates, {
    new: true,
    runValidators: true,
  });
  if (!updatedClub) {
    throw new apiError(404, "Error is club updation");
  }
  res
    .status(200)
    .json(new apiResponse(200, updatedClub, "Club updated successfully."));
});

// DELETE
export const deleteClub = asyncHandler(async (req, res) => {
  const targetedClub = req.club;
  const clubId = targetedClub._id;
  const deletedClub = await Club.findByIdAndDelete(clubId);
  if (!deletedClub) {
    throw new apiError(404, "Error is club deletion.");
  }
  res
    .status(200)
    .json(new apiResponse(200, null, "Club deleted successfully."));
});

export const superAccess = asyncHandler(async (req, res) => {
  const { count, offset, limit, data } = res.paginate;
  if (data.length === 0) {
    return res
      .status(200)
      .json(new apiResponse(200, [], "No Members in your club."));
  }
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { count, offset, limit, data },
        "Club Member retrived successfully."
      )
    );
});

export const changeRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const trimmedId = id.trim();
  const { role } = req.body;
  const user = await User.findById(trimmedId);
  if (!user) {
    throw new apiError(404, "User not found.");
  }
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { role: role },
    { new: true }
  );
  res
    .status(200)
    .json(new apiResponse(200, updatedUser, "Members updated successfully."));
});

export const removeMember = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const trimmedId = id.trim();
  const user = await User.findById(trimmedId);

  if (!user) {
    throw new apiError(404, "User not found.");
  }
  await User.findByIdAndDelete(user._id);

  // check how many clubs the user is in
  const totalClubs = await Club.find({ members: trimmedId });

  if (totalClubs.length === 0) {
    const deletedUser = await User.findByIdAndDelete(user._id);
    if (!deletedUser) {
      throw new apiError(404, "Some Error Occoured");
    }
  }

  res.status(200).json(new apiResponse(200, "Member removed successfully."));
});
