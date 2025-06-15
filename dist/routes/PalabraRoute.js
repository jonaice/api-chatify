"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PalabraController_1 = require("../controllers/PalabraController");
const router = (0, express_1.Router)();
router.get('/obtenerUno/:id', PalabraController_1.PalabraController.obtenerPalabraPorId);
exports.default = router;
