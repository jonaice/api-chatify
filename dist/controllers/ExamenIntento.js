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
exports.ExamenIntento = void 0;
const database_1 = __importDefault(require("../config/database"));
class ExamenIntento {
    // Calcula la calificación del usuario basándose en respuestas correctas
    static calcularCalificacion(usuario_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.query(`SELECT COUNT(*) AS correctas 
         FROM examen_aplicado 
         WHERE usuario_id = $1 AND es_correcta = true`, [usuario_id]);
                const correctas = parseInt(result.rows[0].correctas);
                const calificacion = Math.min(10, (correctas * 10 / 15)).toFixed(1); // Máximo 10
                return calificacion;
            }
            catch (error) {
                console.error('Error al calcular calificación:', error);
                return '0.0';
            }
        });
    }
    // Crea un intento con la calificación calculada
    static crearRegistro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario_id } = req.body;
            if (!usuario_id) {
                return res.status(400).json({ mensaje: 'usuario_id es requerido.' });
            }
            try {
                const calificacion = yield this.calcularCalificacion(usuario_id);
                yield database_1.default.query(`INSERT INTO examen_intento (usuario_id, calificacion) VALUES ($1, $2)`, [usuario_id, calificacion]);
                res.status(201).json({
                    flag: true,
                    mensaje: 'Registro registrado correctamente',
                    calificacion
                });
            }
            catch (error) {
                console.error('Error al registrar intento:', error);
                res.status(500).json({ mensaje: 'Error interno del servidor.' });
            }
        });
    }
}
exports.ExamenIntento = ExamenIntento;
