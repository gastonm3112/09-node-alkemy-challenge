const express = require('express');
const authService = require('../services/authService');
const Success = require('../handlers/successHandler');


/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.next} next 
 */
const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {

        //Buscar user por email
        //Validad password
        //Generar jwt

        res.json(new Success(await authService.login(email, password)));

    } catch (error) {
        next(error);
    }
}




module.exports = {
    login
}


