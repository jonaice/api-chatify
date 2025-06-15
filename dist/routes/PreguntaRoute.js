"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PreguntaController_1 = require("../controllers/PreguntaController");
const router = (0, express_1.Router)();
router.get('/obtenerTodos', PreguntaController_1.PreguntaController.obtenerTodasPreguntas);
exports.default = router;
