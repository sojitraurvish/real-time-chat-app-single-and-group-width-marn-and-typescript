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
exports.removeFromGroup = exports.addToGroup = exports.renameGroup = exports.createGroupChat = exports.fetchChats = exports.accessChat = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chatModel_1 = require("../models/chatModel");
const userModel_1 = require("../models/userModel");
exports.accessChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        // console.log("UserId param not sent with request");
        res.sendStatus(400);
        throw new Error("UserId param not sent with request");
        return;
    }
    var isChat = yield chatModel_1.Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage");
    let isChatArray = yield userModel_1.User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });
    if (isChatArray.length > 0) {
        res.send(isChat[0]);
    }
    else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };
        try {
            const createdChat = yield chatModel_1.Chat.create(chatData);
            const fullChat = yield chatModel_1.Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).send(fullChat);
        }
        catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
}));
exports.fetchChats = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myChat = yield chatModel_1.Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });
        let isChatArray = yield userModel_1.User.populate(myChat, {
            path: "latestMessage.sender",
            select: "name pic email",
        });
        res.status(200).send(isChatArray);
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}));
exports.createGroupChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.users || !req.body.name) {
        res.status(400).send({ message: "Please Fill all the feilds" });
        return;
    }
    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        res.status(400)
            .send("More than 2 users are require to form a group chat");
    }
    users.push(req.user);
    try {
        const groupChat = yield chatModel_1.Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        });
        const fullGroupChat = yield chatModel_1.Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        res.status(200).json(fullGroupChat);
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}));
exports.renameGroup = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, chatName } = req.body;
    if (!chatId || !chatName) {
        res.status(400).send({ message: "Please Fill all the feilds" });
        return;
    }
    const updatedChat = yield chatModel_1.Chat.findByIdAndUpdate(chatId, {
        chatName: chatName
    }, {
        new: true // if i don't pass true it will give me old chatName without updation
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    }
    else {
        res.json(updatedChat);
    }
}));
exports.addToGroup = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    if (!chatId || !userId) {
        res.status(400).send({ message: "Please Fill all the feilds" });
        return;
    }
    const added = yield chatModel_1.Chat.findByIdAndUpdate(chatId, {
        $push: { users: userId },
    }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    }
    else {
        res.json(added);
    }
}));
exports.removeFromGroup = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    if (!chatId || !userId) {
        res.status(400).send({ message: "Please Fill all the feilds" });
        return;
    }
    const removed = yield chatModel_1.Chat.findByIdAndUpdate(chatId, {
        $pull: { users: userId },
    }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    }
    else {
        res.json(removed);
    }
}));
