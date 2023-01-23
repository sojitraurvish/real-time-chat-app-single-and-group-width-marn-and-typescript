"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignedJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getSignedJwtToken = (id) => {
    if (!process.env.JWT_SECRET) {
        console.log("Error : JWT_SECRET define into env file or not able to read it".red);
        return;
    }
    if (!process.env.JWT_EXPIRE) {
        console.log("Error : JWT_EXPIRE define into env file or not able to read it".red);
        return;
    }
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};
exports.getSignedJwtToken = getSignedJwtToken;
