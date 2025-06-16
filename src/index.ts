import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import dotenv from 'dotenv';
import http from 'http';
import db from './config/database';
import fs from 'fs';

// importa tus rutas aquí cuando las tengas:
import usuarioRoute from './routes/UsuarioRoute';
import preguntaRoute from './routes/PreguntaRoute';
import opcionesPreguntaRoute from './routes/OpcionesPreguntaRoute';
import examenAplicadoRoute from './routes/ExamenAplicadoRoute';
import examenIntentoRoute from './routes/ExamenIntento';
import PalabraRoute from './routes/PalabraRoute';
import vozRoutes from './routes/VozRoute';
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
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }

  private middlewares(): void {
    this.app.use(cors()); // CORS habilitado
    this.app.use(express.json()); // JSON
    this.app.use(express.urlencoded({ extended: true })); // formularios
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads',
        limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
        abortOnLimit: true,
      })
    );
    this.app.use(morgan('dev')); // logs para desarrollo
  }

  private routes(): void {
    // Aquí defines tus rutas

    this.app.use('/api/usuarios', usuarioRoute);
    this.app.use('/api/preguntas', preguntaRoute);
    this.app.use('/api/opciones', opcionesPreguntaRoute);
    this.app.use('/api/examenAplicado', examenAplicadoRoute);
    this.app.use('/api/examenIntento', examenIntentoRoute);
    this.app.use('/api/palabras', PalabraRoute);
    this.app.use('/api/voz', vozRoutes);


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
