import express from 'express';
import {
  crearUsuario,
} from './usuarios.service'; // Asegúrate de tener importados los métodos correspondientes

const usuariosRoutes = express.Router();

// Endpoint para crear un usuario
usuariosRoutes.post('/', crearUsuario);

export default usuariosRoutes;
