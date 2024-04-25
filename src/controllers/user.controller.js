import { asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{
    // get user details from frontend
    const {fullName , email , username , password} = req.body 

    //validation (not empty)
    if(
        [fullName,email,username,password].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400 , "All fields are compulsory ")
    }

    //user already exists : username and email cuz they havw unique
    const existedUser = User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser)
        throw new ApiError(409, "User with email or username already exist")

    //check for images , check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    //upload them to cloudinary , avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }

    // after all , create user object for mongodb database as its no sql and not tables
    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

    //create entry in db
    let createdUser = await User.findById(user._id)

    //remove password and refresh token feild from response
    createdUser = createdUser.select(
        "-password -refreshToken")

    //check for user creation successful or not 
    if(!createdUser)
        throw new ApiError(500 , "User Registeration failed")
        
    //return res
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
    )
})


export {registerUser};