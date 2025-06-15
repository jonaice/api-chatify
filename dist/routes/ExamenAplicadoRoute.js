"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const ExamenAplicadoController_1 = require("../controllers/ExamenAplicadoController");
const router = (0, express_1.Router)();
router.post('/crearRegistro', authMiddleware_1.verificarToken, ExamenAplicadoController_1.ExamenAplicadoController.crearRegistro);
exports.default = router;
