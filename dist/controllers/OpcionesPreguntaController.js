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
exports.OpcionesPreguntaController = void 0;
const database_1 = __importDefault(require("../config/database"));
class OpcionesPreguntaController {
    static obtenerOpcionesPorPregunta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pregunta_id } = req.params;
            try {
                const result = yield database_1.default.query(`SELECT 
          op.id AS opcion_id,
          op.pregunta_id,
          op.palabra_id,
          op.es_correcta,
          p.palabra_espanol,
          p.palabra_ingles,
          p.descripcion_espanol,
          p.descripcion_ingles
        FROM opciones_pregunta op
        JOIN palabra p ON op.palabra_id = p.id
        WHERE op.pregunta_id = $1`, [pregunta_id]);
                if (result.rows.length === 0) {
                    return res.status(404).json({ mensaje: 'No se encontraron opciones para esta pregunta.' });
                }
                // Reestructuramos los resultados
                const opciones = result.rows.map((row) => ({
                    id: row.opcion_id,
                    pregunta_id: row.pregunta_id,
                    palabra_id: row.palabra_id,
                    es_correcta: row.es_correcta,
                    palabra: {
                        palabra_espanol: row.palabra_espanol,
                        palabra_ingles: row.palabra_ingles,
                        descripcion_espanol: row.descripcion_espanol,
                        descripcion_ingles: row.descripcion_ingles
                    }
                }));
                res.json(opciones);
            }
            catch (error) {
                console.error('Error al obtener opciones:', error);
                res.status(500).json({ mensaje: 'Error interno del servidor.' });
            }
        });
    }
}
exports.OpcionesPreguntaController = OpcionesPreguntaController;
