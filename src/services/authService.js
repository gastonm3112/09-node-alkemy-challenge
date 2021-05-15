const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('./userService');
const AppError = require('../errors/appError');
const config = require('../config');
const logger = require('../loaders/logger');

const login = async (email, password) => {


    try {

        //Validación de Email
        const user = await userService.findByEmail(email);
        if (!user) {
            throw new AppError('Authentication failed! Email/Password not correct.', 401);
        }

        //Validación de ususario habilitado
        if (!user.enable) {
            throw new AppError('Authentication failed! user disabled.', 401);
        }

        //Validación de Password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new AppError('Authentication failed! Email/Password not correct.', 401);
        }

        //Generar el JWT
        const token = _encrypt(user._id);

        return {
            token,
            user: user.name,
            role: user.role
        }


    } catch (error) {
        throw error;
    }

}

const validToken = async (token) => {

    try {
        //Validar que token venga como parametro
        if (!token) {
            throw new AppError('Authentication failed! Token required', 401);
        }

        logger.info(`Token received: ${token}`)

        //Validar que el token sea íntegro (Que siga vivo)
        let id;
        try {
            const obj = jwt.verify(token, config.auth.secret);
            id = obj.id;
        } catch (verifyError) {
            throw new AppError('Authentication failed! Invalid Token', 401);
        }

        //Validar si hay usuario en DB
        const user = await userService.findById(id);
        if (!user) {
            throw new AppError('Authentication failed! User not found', 401);
        }

        //Validar si el usuario está habilitado
        if (!user.enable) {
            throw new AppError('Authentication failed! User disabled', 401);
        }

        //Retornar el usuario
        return user;

    } catch (error) {
        throw error;
    }
}

const validRole = (user, ...roles) => {
    if (!roles.includes(user.role)) {
        throw new AppError('Authorization failed! User without privileges', 403);
    }
    return true;
}

_encrypt = (id) => {
    return jwt.sign({ id }, config.auth.secret, { expiresIn: config.auth.ttl });

}

module.exports = {
    login,
    validToken,
    validRole
}