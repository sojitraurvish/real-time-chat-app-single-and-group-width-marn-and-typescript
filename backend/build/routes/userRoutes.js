"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route("/")
    .post(userControllers_1.registerUser)
    .get(auth_1.protect, userControllers_1.allUsers);
router.route("/login")
    .post(userControllers_1.authUser);
exports.default = router;
