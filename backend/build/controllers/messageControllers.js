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
exports.allMessages = exports.sendMessage = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chatModel_1 = require("../models/chatModel");
const messageModel_1 = require("../models/messageModel");
const userModel_1 = require("../models/userModel");
exports.sendMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        res.status(400);
        throw new Error("Invalid data passed into request");
    }
    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    };
    try {
        let message = yield messageModel_1.Message.create(newMessage);
        yield chatModel_1.Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        });
        message = yield message.populate("sender", "name pic");
        message = yield message.populate("chat");
        let nextNewMessage = yield userModel_1.User.populate(message, {
            path: "chat.users",
            select: "name pic email"
        });
        res.json(nextNewMessage);
    }
    catch (error) {
        res.status(400);
        throw new Error(`${error}`);
    }
}));
exports.allMessages = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield messageModel_1.Message.find({ chat: req.params.chatId })
            .populate("sender", "name pic email")
            .populate("chat");
        res.json(message);
    }
    catch (error) {
        res.status(400);
        throw new Error(`${error}`);
    }
}));
