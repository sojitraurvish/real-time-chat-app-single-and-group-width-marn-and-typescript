import express  from "express";
import { allUsers, authUser, registerUser } from "../controllers/userControllers";
import {protect} from "../middleware/auth"

const router=express.Router();

router.route("/")
    .post(registerUser)
    .get(protect,allUsers)

router.route("/login")
    .post(authUser)

export default router