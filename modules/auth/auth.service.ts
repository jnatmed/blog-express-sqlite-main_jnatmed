import { Request, Response } from 'express';
import { dbcontext } from '../db/dbcontext';
import { Usuarios } from '../usuarios/usuarios.entity';
import { iLogin } from '../auth/auth.interfaces';
import bcrypt from 'bcrypt';
import logger from '../logger/logger';

export const login = async (req: Request, res: Response) => {
	try {
		const usuarioRepository = dbcontext.getRepository(Usuarios);
		// primero busco al usuario
		const dataRequest = req.body;
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

		res.json({
			msg: `El resultado del login fue : ${compararPass}`,
		});
      logger.debug(`El resultado del login fue : ${compararPass}`)
	} catch (error) {
      res.json({
         msj : 'Usuario/contraseña incorrecto'
      });
		logger.error('Usuario/contraseña incorrecto');
	}
};