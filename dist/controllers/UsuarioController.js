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
exports.UsuarioController = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UsuarioController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.body;
            if (!correo || !password) {
                return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios.' });
            }
            try {
                const result = yield database_1.default.query('SELECT * FROM usuario WHERE correo = $1', [correo]);
                if (result.rows.length === 0) {
                    return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
                }
                const usuario = result.rows[0];
                const passwordValido = yield bcrypt_1.default.compare(password, usuario.password);
                if (!passwordValido) {
                    return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
                }
                const token = jsonwebtoken_1.default.sign({ id: usuario.id }, process.env.JWT_SECRET || 'secreto', { expiresIn: '7d' } // 7 días
                );
                res.json({
                    flag: true,
                    token,
                    usuario: {
                        id: usuario.id,
                        nombre: usuario.nombre,
                        correo: usuario.correo,
                    }
                });
            }
            catch (error) {
                console.error('Error en login:', error);
                res.status(500).json({ mensaje: 'Error interno del servidor.' });
            }
        });
    }
    static crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, correo, password } = req.body;
            if (!nombre || !correo || !password) {
                return res.status(400).json({ mensaje: 'Faltan datos obligatorios.' });
            }
            try {
                yield database_1.default.query('INSERT INTO usuario (nombre, correo, password) VALUES ($1, $2, $3)', [nombre, correo, password]);
                res.status(201).json({ flag: true, mensaje: 'Usuario creado correctamente.' });
            }
            catch (error) {
                console.error('Error al crear usuario:', error);
                res.status(500).json({ mensaje: 'Error al crear usuario.' });
            }
        });
    }
    static obtenerUsuarioPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield database_1.default.query('SELECT id, nombre, correo FROM usuario WHERE id = $1', [id]);
                if (result.rows.length === 0) {
                    return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
                }
                const usuario = result.rows[0];
                res.json(usuario);
            }
            catch (error) {
                console.error('Error al obtener usuario:', error);
                res.status(500).json({ mensaje: 'Error interno del servidor.' });
            }
        });
    }
    static eliminarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.query('DELETE FROM usuario WHERE id = $1', [id]);
                res.json({ flag: true, mensaje: 'Usuario eliminado correctamente.' });
            }
            catch (error) {
                console.error('Error al eliminar usuario:', error);
                res.status(500).json({ mensaje: 'Error al eliminar usuario.' });
            }
        });
    }
}
exports.UsuarioController = UsuarioController;
