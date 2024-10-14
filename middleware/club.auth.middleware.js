import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Club } from "../model/club.model.js";

const verifyClubAuth = asyncHandler ( async(req, res, next) => {
    try {
        const token = req.cookies?.clubT || req.header("Authorization")?.replace("Bearer ", "")
        if(!token) throw new apiError(401, "Unauthorized request")
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_CLUB)
        const club = await Club.findById(decodedToken?._id)
    
        if(!club) throw new apiError(401, "Invalid access token")
    
        req.club = club;
        next()
    } catch (error) {
        throw new apiError(401, "Invalid access token")
    }
})

export default verifyClubAuth