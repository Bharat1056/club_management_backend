import { User } from "../model/user.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import {Club} from "../model/club.model.js"

export const createUser = asyncHandler(async (req, res) => {
      // add your own logic here
      const { username, email, password, fullName, gender, yearOfGraduation, club, domain, photo, skills, githubLink, linkedinLink } = req.body;
      let validationErrors = [];
      if (!username) validationErrors.push("Username is required.");
      if (!email) validationErrors.push("Email is required.");
      if (!password) validationErrors.push("Password is required.");
      if (!fullName) validationErrors.push("Full name is required.");
      if (!gender) validationErrors.push("Gender is required.");
      if (!yearOfGraduation) validationErrors.push("Year of graduation is required.");
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
  
     
      const user = new User({
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
  
      await user.save();
  
      res.status(201).json(new apiResponse(201, user, "User created successfully."));
});

export const updateUser = asyncHandler(async (req, res) => {
      // add your own logic here
    
        const { id } = req.params;
        const trimmedId = id.trim();
        console.log(`User ID to update: ${trimmedId}`);
        
        const updates = req.body;
    
        
        if (updates.username) {
           
            const existingUser = await User.findOne({ username: updates.username });
            if (existingUser && existingUser._id.toString() !== trimmedId) {
                throw new apiError(400, "Username is already taken.");
            }
        }
        if (updates.email) {
           
            const existingUser = await User.findOne({ email: updates.email });
            if (existingUser && existingUser._id.toString() !== trimmedId) {
                throw new apiError(400, "Email is already in use.");
            }
        }
    
        const updatedUser = await User.findByIdAndUpdate(trimmedId, updates, {
            new: true,
            runValidators: true,
        });
    
        if (!updatedUser) {
            throw new apiError(404, "User not found.");
        }
        res.status(200).json(new apiResponse(200, updatedUser, "User updated successfully."));
});

export const deleteUser = asyncHandler(async (req, res) => {
     
      const { id } = req.params;
      const trimmedId = id.trim();
      console.log(`User ID to delete: ${trimmedId}`);
      const deletedUser = await User.findByIdAndDelete(trimmedId);
      if (!deletedUser) {
          throw new apiError(404, "User not found.");
      }
      res.status(200).json(new apiResponse(200, null, "User deleted successfully."));
});

export const getAllUsers = asyncHandler(async (req, res) => {
      // add your own logic here
      const users = await User.find(); // Fetch all users

      res.status(200).json(new apiResponse(200, users, "Users retrieved successfully."));
});

export const getUserById = asyncHandler(async (req, res) => {
      // add your own logic here
      const { id } = req.params;
      const trimmedId = id.trim();
      console.log(`User ID to retrive data: ${trimmedId}`);
      const user = await User.findById(trimmedId).populate('club'); 
      if (!user) {
          throw new apiError(404, "User not found.");
      }
  
      res.status(200).json(new apiResponse(200, user, "User retrieved successfully."));
});

export const getAllUsersByClubName = asyncHandler(async (req, res) => {
    const { clubName } = req.params;
    console.log(`Club name from URL: ${clubName}`);
    const club = await Club.findOne({ clubName: clubName });
    if (!club) {
        throw new apiError(404, `Club with the name ${clubName} not found.`);
    }
    const users = await User.find({ club: club._id }).populate('club');
    if (users.length === 0) {
        throw new apiError(404, `No users found for the club ${clubName}.`);
    }
    res.status(200).json(new apiResponse(200, users, `Users from club ${clubName} retrieved successfully.`));
});



  