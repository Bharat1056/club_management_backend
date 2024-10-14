import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const verifyUserAuth = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.userT || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new apiError(401, "Unauthorized request");

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_USER
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) throw new apiError(401, "Invalid access token");

    req.user = user;
    next();
  } catch (error) {
    throw new apiError(401, "Invalid access token");
  }
});

export default verifyUserAuth;
