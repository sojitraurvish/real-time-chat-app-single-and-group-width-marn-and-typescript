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
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.MONGO_URI) {
        console.log("Error : MONGO_URI define into env file or not able to read it".red);
        return;
    }
    try {
        const con = yield mongoose_1.default.connect(process.env.MONGO_URI, {
        // useUnifiedTropology:true,
        // useNewUrlParser:true,
        // useCreateIndex:true
        });
        console.log(`MongoDB Connected : ${con.connection.host}`.cyan.underline);
    }
    catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
});
exports.default = connectDB;
