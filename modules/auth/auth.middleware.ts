import { Request, Response, NextFunction } from 'express';
import logger from '../logger/logger';

export const verifyTokenMiddleware = (
    req : Request, 
    res : Response, 
    next : NextFunction
) => {
    const token = req.headers["authorization"]

    logger.debug(token);

    if(!token) {
        return res.status(403).json({
            msg : 'Token no proporcionado'
        })
    }
    
    next();
}