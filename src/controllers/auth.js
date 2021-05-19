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

        res.json(new Success(await authService.login(email, password)));

    } catch (error) {
        next(error);
    }
}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.next} next 
 */
const register = async (req, res, next) => {
    const { email, password } = req.body;

    try {

        res.status(201).json(new Success(await authService.register(email, password)));

    } catch (error) {
        next(error);
    }
}




module.exports = {
    login,
    register
}


