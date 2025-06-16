"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VozController_1 = require("../controllers/VozController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Aplica multer para capturar el archivo con clave 'audio'
router.post('/transcribir', authMiddleware_1.verificarToken, VozController_1.VozController.transcribirAudio);
exports.default = router;
