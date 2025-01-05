import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const verifyClubUserAuth = asyncHandler(async (req, res, next) => {
  try {
    const currentClub = req.club;
    const { id } = req.params;
    const trimmedId = id.trim(); // user id
    const isUserExist = await User.findById(trimmedId);
    console.log(isUserExist);
    if (!isUserExist) throw new apiError(401, "User is Invalid");

    if (!isUserExist.isAuthenticated)
      throw new apiError(401, "User is not verified");

    if (!isUserExist.isInClub)
      throw new apiError(401, "User is not in any club");

    if (!isUserExist.clubId.includes(currentClub._id))
      throw new apiError(401, "You can't remove user from another club");




    next();
  } catch (error) {
    throw new apiError(401, "Invalid access token");
  }
});

export default verifyClubUserAuth;
