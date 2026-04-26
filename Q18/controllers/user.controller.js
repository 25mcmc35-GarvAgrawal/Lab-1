import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt, { decode } from "jsonwebtoken";

const generateAccessAndRefreshToken = async(id) => {
    const user = await User.findById(id) ; 
    const accessToken = user.generateAccessToken() ; 
    const refreshToken = user.generateRefreshToken() ; 
    user.refreshToken = refreshToken

    user.save({validateBeforeSave : false}) ; 

    return {accessToken , refreshToken} ; 
}


const register = asyncHandler(async (req , res) => {

    // Get username , email , password from user 
    // verify do we get the value or not 
    // check no user exist with same user or email
    // if exist throw error 
    // create a new extry and store it
    // return the response

    const {username , email , password} = req.body ; 

    if ([username, email, password].some(field => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
}

    const existUser = await User.findOne({
        $or : [{email} , {username}] 
    })

    if(existUser){
        throw new ApiError(400 , "User already exist") ; 
    }

    const user = await User.create({
        username : username , 
        email : email ,
        password : password 
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken") ; 

    return res.status(200).json(new ApiResponse(200 , createdUser , "User created successfully")) ; 
})

const login = asyncHandler(async (req , res) => {

    // Get email and password from user
    // check if we get both email and passowrd 
    // find the user
    // check if user exist
    // check if password is correct or not
    // create a cookie to send
    // send response

    const {email , password} = req.body ;  

    if([email , password].some(field => !field?.trim())){
        throw new ApiError(400 , "Need both email and password") ; 
    }

    const user = await User.findOne({email: email}) 

    const isPasswordValid = await user.isPasswordCorrect(password) ;

    if(!isPasswordValid){
        throw new ApiError(400 , "Password is incorrect") ; 
    }
    
    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id) ; 

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken") ; 

    const option = {
        httpOnly: true ,
        secure: true 
    }

    return res.status(200)
    .cookie("accessToken" , accessToken , option)
    .cookie("refreshToken" , refreshToken , option)
    .json(new ApiResponse(200 , loggedInUser , "Login Successfully")) ;
})

const logout = asyncHandler(async(req , res) => {
    const userId = req.user._id ; 

    await User.findByIdAndUpdate(
        userId ,
        {
            $set :
            {
                refreshToken: undefined  , 
            },
        },
        {
            new: true 
        }
    )

    const option = {
        httpOnly: true ,
        secure: true 
    }

    return res.status(200)
    .clearCookie("accessToken" , option)
    .clearCookie("refreshToken" , option)
    .json(
        new ApiResponse(200 , {} , "Logout Successfully") 
    )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token expired or already used");
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true
        };

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, {}, "Tokens refreshed successfully"));

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

export {
    register,
    login,
    logout,
    refreshAccessToken
}
