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
exports.PalabraController = void 0;
const database_1 = __importDefault(require("../config/database"));
class PalabraController {
    static obtenerPalabraPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield database_1.default.query('SELECT id, palabra_espanol, palabra_ingles, descripcion_espanol, descripcion_ingles FROM palabra WHERE id = $1', [id]);
                if (result.rows.length === 0) {
                    return res.status(404).json({ mensaje: 'Palabra no encontrada.' });
                }
                res.status(200).json(result.rows[0]);
            }
            catch (error) {
                console.error('Error al obtener palabra:', error);
                res.status(500).json({ mensaje: 'Error interno del servidor.' });
            }
        });
    }
    static obtenerTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.query('SELECT id, palabra_espanol, palabra_ingles, descripcion_espanol, descripcion_ingles FROM palabra ');
                if (result.rows.length === 0) {
                    return res.status(404).json({ mensaje: 'No hay palabras disponibles' });
                }
                res.status(200).json(result.rows);
            }
            catch (error) {
                console.error('Error al obtener palabras', error);
                res.status(500).json({ mensaje: 'Error interno del servidor.' });
            }
        });
    }
    static obtenerAlgunos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.query(`SELECT 
        p.id, 
        p.palabra_espanol, 
        p.palabra_ingles, 
        p.descripcion_espanol, 
        p.descripcion_ingles,
        a.url_audio_cloudinary
      FROM palabra p
      JOIN audio a ON p.id = a.palabra_id
      WHERE p.id BETWEEN 1 AND 15
      ORDER BY p.id ASC`);
                if (result.rows.length === 0) {
                    return res.status(404).json({ mensaje: 'No hay palabras disponibles con audio.' });
                }
                return res.status(200).json(result.rows);
            }
            catch (error) {
                console.error('Error al obtener palabras con audio', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor.' });
            }
        });
    }
}
exports.PalabraController = PalabraController;
