import { Request, Response } from 'express';
import { Usuarios } from './usuarios.entity'; // Asegúrate de tener la entidad de Usuarios importada
import { dbcontext } from '../db/dbcontext';
import { iUsuario } from './usuarios.interface';
import logger from '../logger/logger';

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const usuarioRepository = dbcontext.getRepository(Usuarios);
    let UsuarioData: iUsuario = req.body;
    
    UsuarioData.email = UsuarioData.email.toLowerCase();

    // Creamos el usuario sin guardar
    const usuario = usuarioRepository.create(UsuarioData);

    // Guardamos el usuario
    const guardarUsuario = await usuarioRepository.save(usuario);

    res.json({
      msg: `Se creó el usuario correctamente con el id: ${guardarUsuario.id}`,
    });

    logger.debug(`Se creó el usuario ${JSON.stringify(guardarUsuario)}`);

  } catch (error) {
    logger.error(`No se pudo crear el usuario ${error}`);
    res.status(500).json({ msg: 'No se pudo guardar el usuario' });
  }
};
