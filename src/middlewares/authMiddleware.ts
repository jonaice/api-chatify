import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ mensaje: 'Token requerido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
    (req as any).usuario = decoded; // guardamos el usuario en la request
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};