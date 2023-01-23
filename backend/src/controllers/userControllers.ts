import { Request, Response, NextFunction } from "express"
import asyncHandler from "express-async-handler"
import { getSignedJwtToken } from "../config/getSignedJwtToken"
import { User } from "../models/userModel"

export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, pic } = req.body

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds")
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400)
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: getSignedJwtToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error("Failed to Create the User")
    }
})

export const authUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds")
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {

        res.status(400);
        throw new Error("Invalid Email or Password")
    }

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: getSignedJwtToken(user._id)
    })
})


export const allUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    } : {};

    const users = await User.find(keyword).find({_id:{$ne:req.user._id}})
    res.send(users)

})

