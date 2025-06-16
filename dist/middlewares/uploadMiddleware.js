"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Asegurar que la carpeta 'uploads/' exista
const uploadsDir = 'uploads/';
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir);
}
// Almacenamiento en disco temporal
const storage = multer_1.default.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    },
});
// Solo acepta archivos de audio
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Solo se permiten archivos de audio.'), false);
    }
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // ✅ Limita a 10 MB
    },
});
exports.default = upload;
