"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PalabraController_1 = require("../controllers/PalabraController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/obtenerUno/:id', authMiddleware_1.verificarToken, PalabraController_1.PalabraController.obtenerPalabraPorId);
exports.default = router;
