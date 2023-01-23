"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const getSignedJwtToken_1 = require("../config/getSignedJwtToken");
const userModel_1 = require("../models/userModel");
exports.registerUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }
    const userExists = yield userModel_1.User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = yield userModel_1.User.create({
        name,
        email,
        password,
        pic
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: (0, getSignedJwtToken_1.getSignedJwtToken)(user._id)
        });
    }
    else {
        res.status(400);
        throw new Error("Failed to Create the User");
    }
}));
exports.authUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }
    const user = yield userModel_1.User.findOne({ email }).select("+password");
    if (!user || !(yield user.matchPassword(password))) {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: (0, getSignedJwtToken_1.getSignedJwtToken)(user._id)
    });
}));
