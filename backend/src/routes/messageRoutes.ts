import express from "express"
import { protect } from "../middleware/auth"
import { sendMessage,allMessages } from "../controllers/messageControllers"

const router=express.Router()

router.route("/")
    .post(protect,sendMessage)
router.route("/:chatId")
    .get(protect,allMessages)

export default router