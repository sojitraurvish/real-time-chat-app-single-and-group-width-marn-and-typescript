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
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const config_1 = __importDefault(require("./config/config"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "config.env") });
(0, config_1.default)();
colors_1.default.enable();
const app = (0, express_1.default)();
// To Accept JSON Data
app.use(express_1.default.json());
// const ___dirname = path.resolve();
const ___dirname = path_1.default.resolve();
const rootDir = path_1.default.dirname(___dirname);
app.use("/uploads", express_1.default.static(path_1.default.join(rootDir, "/uploads")));
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.get("/", (req, res, next) => {
    res.send("API is Running...");
});
app.use("/api/users", userRoutes_1.default);
app.use("/api/chats", chatRoutes_1.default);
app.use("/api/upload", uploadRoutes_1.default);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold);
});
