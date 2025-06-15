"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OpcionesPreguntaController_1 = require("../controllers/OpcionesPreguntaController");
const router = (0, express_1.Router)();
router.get('/obtener/porPregunta/:pregunta_id', OpcionesPreguntaController_1.OpcionesPreguntaController.obtenerOpcionesPorPregunta);
exports.default = router;
