import jwt from 'jsonwebtoken';
import logger from '../logger/logger';

const secret = process.env.SECRET_JWT || 'DefatulPassword';

export const generarTokenJWT = (payload : object) : string => {
    const token = jwt.sign(payload, secret, { expiresIn : '2h'});
    logger.debug(`secret: ${secret}`);
    return token;
}