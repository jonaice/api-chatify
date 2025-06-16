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
exports.VozController = void 0;
const assemblyai_1 = require("assemblyai");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const client = new assemblyai_1.AssemblyAI({
    apiKey: process.env.ASSEMBLYAI_API_KEY || '',
});
class VozController {
    static transcribirAudio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Verificar que se recibió el archivo
                const archivo = (_a = req.files) === null || _a === void 0 ? void 0 : _a.audio;
                if (!archivo || Array.isArray(archivo)) {
                    return res.status(400).json({ mensaje: 'No se envió el archivo de audio.' });
                }
                // Ruta temporal del archivo
                const rutaTemporal = archivo.tempFilePath;
                // Subir a Cloudinary
                const uploadResult = yield cloudinary_1.default.uploader.upload(rutaTemporal, {
                    resource_type: 'video', // Cloudinary trata audio como video
                    folder: 'audios',
                });
                // Eliminar archivo local después de subir
                fs_1.default.unlinkSync(rutaTemporal);
                const audioUrl = uploadResult.secure_url;
                const publicId = uploadResult.public_id;
                // Transcripción con AssemblyAI
                const transcript = yield client.transcripts.transcribe({
                    audio: audioUrl,
                    speech_model: 'universal',
                });
                // Eliminar archivo de Cloudinary
                yield cloudinary_1.default.uploader.destroy(publicId, {
                    resource_type: 'video',
                });
                return res.status(200).json({ texto: transcript.text });
            }
            catch (error) {
                console.error('Error en transcripción:', error);
                return res.status(500).json({ mensaje: 'Error al procesar el audio' });
            }
        });
    }
}
exports.VozController = VozController;
