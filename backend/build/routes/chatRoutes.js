"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatControllers_1 = require("../controllers/chatControllers");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route("/")
    .post(auth_1.protect, chatControllers_1.accessChat) // accessing chat and if not found so creating chat
    .get(auth_1.protect, chatControllers_1.fetchChats); // get chat for particular user
router.route("/group")
    .post(auth_1.protect, chatControllers_1.createGroupChat); //create group
router.route("/rename")
    .put(auth_1.protect, chatControllers_1.renameGroup); //rename group
router.route("/groupremove")
    .put(auth_1.protect, chatControllers_1.removeFromGroup); //remove or leave group
router.route("/groupadd")
    .put(auth_1.protect, chatControllers_1.addToGroup); //add someone to group
exports.default = router;
