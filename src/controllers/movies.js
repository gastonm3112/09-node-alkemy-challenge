const express = require('express');
const movieService = require('../services/movieService');
const Success = require('../handlers/successHandler');


/**
 * 
 * @param {exprees.Request} req 
 * @param {express.Response} res 
 */

/*const getAllUsers = async (req, res, next) => {

    try {
        const users = await userService.findAll(req.query.filter, req.query.options);

        res.json(new Success(users));

    } catch (err) {
        next(err);
    }
};*/

/**
 * 
 * @param {exprees.Request} req 
 * @param {express.Response} res 
 */

const createMovie = async (req, res, next) => {
    try {
        let movie = req.body;
        movie = await movieService.save(movie);

        res.status(201).json(new Success(movie));

    } catch (err) {
        next(err);
    }

};

/**
 * 
 * @param {exprees.Request} req 
 * @param {express.Response} res 
 */

const updateMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        let movie = req.body;
        movie.id = id;

        const movieUpdated = await movieService.update(id, movie);

        res.json(new Success(movieUpdated));
    } catch (err) {
        next(err);
    }
};

/**
 * 
 * @param {exprees.Request} req 
 * @param {express.Response} res 
 */

const getMovieById = async (req, res, next) => {
    try {
        const movie = await movieService.findById(req.params.id)

        res.json(new Success(movie));
    } catch (err) {
        next(err);
    }

};

/**
 * 
 * @param {exprees.Request} req 
 * @param {express.Response} res 
 */

const deleteMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await movieService.remove(id);

        res.json(new Success(movie));

    } catch (err) {
        next(err);
    }
};

module.exports = {
    // getAllUsers,
    createMovie,
    updateMovie,
    getMovieById,
    deleteMovie
}


