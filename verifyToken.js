import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = () => {
    const token = req.headers.authorization || req.headers.Authorization;
    console.log("Token:", token);
    if (!token)
        return next(createError(401, 'You are not authenticated!'));
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, 'Token is not valid!'));
        req.user = user;
        next();
    });
};
