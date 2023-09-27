import { Request, Response } from 'express';
import { dbcontext } from '../db/dbcontext';
import { Usuarios } from '../usuarios/usuarios.entity';
import { iLogin } from '../auth/auth.interfaces';
import bcrypt from 'bcrypt';
import logger from '../logger/logger';
import { generarTokenJWT } from '../utils/jwt.service';

export const login = async (req: Request, res: Response) => {
	try {

      const usuarioRepository = dbcontext.getRepository(Usuarios);
		// primero busco al usuario
		let dataRequest : iLogin = req.body;

      const buscarUsuario = await usuarioRepository.findOneBy({
			email: dataRequest.email,
		});

		if (!buscarUsuario) {
			throw new Error('Usuario/contraseña incorrecto');
		}

		const compararPass = await bcrypt.compare(
			dataRequest.pass,
			buscarUsuario.pass
		);

      if(!compararPass) {
         throw new Error();
      }

      //Genero token
      const payload = {
         id_usuario : buscarUsuario.id,
         email : buscarUsuario.email,
         nombre : buscarUsuario.nombre,
         apellido : buscarUsuario.apellido,
      };

      const token = generarTokenJWT(payload);

		res.json({
			token : token
		});

      logger.debug(`El resultado del login fue : ${compararPass}`)

	} catch (error) {
      res.json({
         msj : 'Usuario/contraseña incorrecto'
      });
		logger.error('Usuario/contraseña incorrecto');
	}
};