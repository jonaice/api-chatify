"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VozController_1 = require("../controllers/VozController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const router = (0, express_1.Router)();
// Aplica multer para capturar el archivo con clave 'audio'
router.post('/transcribir', authMiddleware_1.verificarToken, uploadMiddleware_1.default.single('audio'), (err, req, res, next) => {
    if (err) {
        console.error(" Error en multer:", err);
        return res.status(400).json({ mensaje: 'Error en la carga del audio', detalle: err.message });
    }
    next();
}, VozController_1.VozController.transcribirAudio);
exports.default = router;
