"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        const ___dirname = path_1.default.resolve();
        const rootDir = path_1.default.dirname(___dirname);
        cb(null, path_1.default.join(rootDir, "uploads"));
    },
    filename(req, file, cb) {
        console.log(`${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
/**
 * Check if a file type matches one of the expected extensions (images only)
 * @param file
 * @param cb
 */
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb(Error("Images only!"));
    }
}
const upload = (0, multer_1.default)({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});
router.post("/", upload.single("image"), (req, res) => {
    res.send(`/${req.file.path.split(`\\`)[3]}`);
});
exports.default = router;
