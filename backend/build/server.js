"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colors_1 = __importDefault(require("colors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const data_1 = require("./data/data");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "config.env") });
colors_1.default.enable();
const app = (0, express_1.default)();
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.get("/", (req, res, next) => {
    res.send("API is Running...");
});
app.get("/api/chat", (req, res, next) => {
    res.send(data_1.chats);
});
app.get("/api/chat/:id", (req, res, next) => {
    const singleChat = data_1.chats.find((chat) => chat._id === req.params.id);
    res.send(singleChat);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold);
});
