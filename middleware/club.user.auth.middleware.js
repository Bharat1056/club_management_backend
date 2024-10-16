import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const verifyClubUserAuth = asyncHandler(async (req, res, next) => {
  try {
    const currentClub = req.club;
    const { id } = req.params;
    const trimmedId = id.trim(); // user id
    const isUserExist = await User.findById(trimmedId);
    if (!isUserExist) throw new apiError(401, "User is Invalid");

    if (isUserExist.clubId !== currentClub._id)
      throw new apiError(401, "Access is Denied");

    next();
  } catch (error) {
    throw new apiError(401, "Invalid access token");
  }
});

export default verifyClubUserAuth;
