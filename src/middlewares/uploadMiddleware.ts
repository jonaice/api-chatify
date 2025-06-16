import multer from 'multer';
import path from 'path';

// Almacenamiento en disco temporal
const storage = multer.diskStorage({
  destination: 'uploads/', 
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

// Solo acepta archivos de audio
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith('audio/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de audio.'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
