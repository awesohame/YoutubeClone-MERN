import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"

//this middleware checks if there exists cookie and if it does then that means an user is logged in
//hence it adds that user's info from the db in the req as "req.user" so that the next handler can use it accodingly
export const verifyJWT = asyncHandler( async(req, _, next) => {
  
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    // console.log("Cookies:", req.cookies);
    // console.log("Authorization header:", req.header("Authorization"));
    
    
    if(!token) throw new ApiError(401, "Unauthorized Request")
      
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      
      const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
      console.log("Found user:", user);
      console.log("Decoded token:", decodedToken);
      console.log("Extracted token:", token);
  
    if(!user) throw new ApiError(401, "Invalid Access token");
    
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
})