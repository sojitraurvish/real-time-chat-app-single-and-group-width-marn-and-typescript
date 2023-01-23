import express  from "express";
import { accessChat, createGroupChat, fetchChats, renameGroup,removeFromGroup,addToGroup } from "../controllers/chatControllers";
import { allUsers, authUser, registerUser } from "../controllers/userControllers";
import {protect} from "../middleware/auth"

const router=express.Router();

router.route("/")
    .post(protect,accessChat)// accessing chat and if not found so creating chat
    .get(protect,fetchChats) // get chat for particular user
    
router.route("/group")
    .post(protect,createGroupChat)//create group

router.route("/rename")
    .put(protect,renameGroup)//rename group

router.route("/groupremove")
    .put(protect,removeFromGroup)//remove or leave group

router.route("/groupadd")
    .put(protect,addToGroup)//add someone to group

export default router