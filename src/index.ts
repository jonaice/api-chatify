import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import dotenv from 'dotenv';
import http from 'http';
import db from './config/database';


// importa tus rutas aquí cuando las tengas:
import usuarioRoute from './routes/UsuarioRoute';
import preguntaRoute from './routes/PreguntaRoute';


dotenv.config();

class Server {
  private app: Application;
  private port: string;
  private server: http.Server;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.middlewares();
    this.routes();
    this.connectDB();
    this.server = http.createServer(this.app);
  }

  private middlewares(): void {
    this.app.use(cors()); // CORS habilitado
    this.app.use(express.json()); // JSON
    this.app.use(express.urlencoded({ extended: true })); // formularios
    this.app.use(fileUpload()); // soporte para archivos (PDFs, audios, imágenes)
    this.app.use(morgan('dev')); // logs para desarrollo
  }

  private routes(): void {
    // Aquí defines tus rutas

    this.app.use('/api/usuarios', usuarioRoute);
    this.app.use('/api/preguntas', preguntaRoute);

    
    this.app.get('/', (_req, res) => {
      res.send('API de aprendizaje de inglés en funcionamiento');
    });
  }

  private async connectDB(): Promise<void> {
    try {
      await db.query('SELECT NOW()'); // prueba de conexión
      console.log('Base de datos conectada');
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
      process.exit(1);
    }
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto:${this.port}`);
    });
  }
}

// Ejecutar el servidor
const server = new Server();
server.listen();
