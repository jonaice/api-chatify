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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const database_1 = __importDefault(require("./config/database"));
// importa tus rutas aquí cuando las tengas:
const UsuarioRoute_1 = __importDefault(require("./routes/UsuarioRoute"));
const PreguntaRoute_1 = __importDefault(require("./routes/PreguntaRoute"));
const OpcionesPreguntaRoute_1 = __importDefault(require("./routes/OpcionesPreguntaRoute"));
const ExamenAplicadoRoute_1 = __importDefault(require("./routes/ExamenAplicadoRoute"));
const ExamenIntento_1 = __importDefault(require("./routes/ExamenIntento"));
const PalabraRoute_1 = __importDefault(require("./routes/PalabraRoute"));
const VozRoute_1 = __importDefault(require("./routes/VozRoute"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
        this.connectDB();
        this.server = http_1.default.createServer(this.app);
    }
    middlewares() {
        this.app.use((0, cors_1.default)()); // CORS habilitado
        this.app.use(express_1.default.json()); // JSON
        this.app.use(express_1.default.urlencoded({ extended: true })); // formularios
        this.app.use((0, express_fileupload_1.default)()); // soporte para archivos (PDFs, audios, imágenes)
        this.app.use((0, morgan_1.default)('dev')); // logs para desarrollo
    }
    routes() {
        // Aquí defines tus rutas
        this.app.use('/api/usuarios', UsuarioRoute_1.default);
        this.app.use('/api/preguntas', PreguntaRoute_1.default);
        this.app.use('/api/opciones', OpcionesPreguntaRoute_1.default);
        this.app.use('/api/examenAplicado', ExamenAplicadoRoute_1.default);
        this.app.use('/api/examenIntento', ExamenIntento_1.default);
        this.app.use('/api/palabras', PalabraRoute_1.default);
        this.app.use('/api/voz', VozRoute_1.default);
        this.app.get('/', (_req, res) => {
            res.send('API de aprendizaje de inglés en funcionamiento');
        });
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('SELECT NOW()'); // prueba de conexión
                console.log('Base de datos conectada');
            }
            catch (error) {
                console.error('Error al conectar con la base de datos:', error);
                process.exit(1);
            }
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto:${this.port}`);
        });
    }
}
// Ejecutar el servidor
const server = new Server();
server.listen();
