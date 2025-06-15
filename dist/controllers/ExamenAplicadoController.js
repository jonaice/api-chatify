"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamenAplicadoController = void 0;
const database_1 = __importDefault(require("../config/database"));
class ExamenAplicadoController {
    // Verifica si la palabra es la opción correcta para esa pregunta
    static verificarRespuesta(pregunta_id, palabra_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.query(`SELECT es_correcta FROM opciones_pregunta 
         WHERE pregunta_id = $1 AND palabra_id = $2`, [pregunta_id, palabra_id]);
                if (result.rows.length === 0)
                    return false;
                return result.rows[0].es_correcta;
            }
            catch (error) {
                console.error('Error verificando respuesta:', error);
                return false;
            }
        });
    }
    // Crea un registro de respuesta aplicada por el usuario
    static crearRegistro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario_id, pregunta_id, palabra_id_respuesta } = req.body;
            if (!usuario_id || !pregunta_id || !palabra_id_respuesta) {
                return res.status(400).json({ mensaje: 'Faltan datos obligatorios.' });
            }
            try {
                const esCorrecta = yield this.verificarRespuesta(pregunta_id, palabra_id_respuesta);
                yield database_1.default.query(`INSERT INTO examen_aplicado (usuario_id, pregunta_id, palabra_id_respuesta, es_correcta)
         VALUES ($1, $2, $3, $4)`, [usuario_id, pregunta_id, palabra_id_respuesta, esCorrecta]);
                res.status(201).json({
                    flag: true,
                    mensaje: 'Respuesta de examen guardado',
                });
            }
            catch (error) {
                console.error('Error al registrar el examen:', error);
                res.status(500).json({ mensaje: 'Error interno del servidor.' });
            }
        });
    }
}
exports.ExamenAplicadoController = ExamenAplicadoController;
