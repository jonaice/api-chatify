"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const ExamenIntento_1 = require("../controllers/ExamenIntento");
const router = (0, express_1.Router)();
router.post('/crearRegistro', authMiddleware_1.verificarToken, ExamenIntento_1.ExamenIntento.crearRegistro);
exports.default = router;
