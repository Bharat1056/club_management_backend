import { User } from "../model/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

export const createUser = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    fullName,
    gender,
    yearOfGraduation,
    club,
    domain,
    photo,
    skills,
    githubLink,
    linkedinLink,
    activeClub
  } = req.body;
  let validationErrors = [];
  if (!username) validationErrors.push("Username is required.");
  if (!email) validationErrors.push("Email is required.");
  if (!password) validationErrors.push("Password is required.");
  if (!fullName) validationErrors.push("Full name is required.");
  if (!gender) validationErrors.push("Gender is required.");
  if (!yearOfGraduation)
    validationErrors.push("Year of graduation is required.");
  if (!club) validationErrors.push("Club membership is required.");
  if (validationErrors.length > 0) {
    throw new apiError(400, validationErrors.join(" "));
  }
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new apiError(400, "User with this email already exists.");
  }
  //check if username already exist
  const existingUserByUsername = await User.findOne({ username });
  if (existingUserByUsername) {
    throw new apiError(400, "User with this username already exists.");
  }

  // const society = await Club.findOne({ name: club });
  // if (!society) {
  //   throw new apiError(404, "Club not found.");
  // }

  // create the user
  const user = await User.create({
    username,
    email,
    password,
    fullName,
    gender,
    yearOfGraduation,
    club,
    domain,
    photo,
    skills,
    githubLink,
    linkedinLink,
  });

  // send mail to their corresponding club owner

  res
    .status(201)
    .json(new apiResponse(201, user, "User created successfully."));
});

export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const updates = req.body;

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new apiError(404, "Error is updating the user");
  }
  res
    .status(200)
    .json(new apiResponse(200, updatedUser, "User updated successfully."));
});

export const getUserById = asyncHandler(async (req, res) => {
  // add your own logic here
  const { id } = req.params;
  const trimmedId = id.trim();
  console.log(`User ID to retrive data: ${trimmedId}`);
  const user = await User.findById(trimmedId).populate("club");
  if (!user) {
    throw new apiError(404, "User not found.");
  }

  res
    .status(200)
    .json(new apiResponse(200, user, "User retrieved successfully."));
});
