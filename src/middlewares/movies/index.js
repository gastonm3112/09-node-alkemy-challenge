const { check } = require('express-validator');
const AppError = require('../../errors/appError');
const movieService = require('../../services/movieService');
const { ROLES, ADMIN_ROLE } = require('../../constants');
const { validationResult } = require('../commons');
const { validJWT, hasRole } = require('../auth');


const _titleRequired = check('title', 'Title required').not().isEmpty();

const _roleValid = check('role').optional().custom(
  async (role = '') => {
    if (!ROLES.includes(role)) {
      throw new AppError('Invalid Role', 400);
    }
  }
);


const _idrequired = check('id').not().isEmpty();
const _idIsNumeric = check('id').isNumeric();
const _idExist = check('id').custom(
  async (id = '') => {
    const movieFound = await movieService.findById(id);
    if (!movieFound) {
      throw new AppError('The id does not exist in DB', 400);
    }
  }
);

const _calificationRequired = check('calification').not().isEmpty();
const _calificationIsNumeric = check('calification').isNumeric();
const _calificationIsOptional = check('calification').optional().isNumeric();
const _creationDateRequired = check('creationDate').not().isEmpty();
const _creationDateValid = check('creationDate').optional().isDate('MM-DD-YYYY');
const _titleNotExist = check('title').custom(
  async (title = '') => {
    const movieFound = await movieService.findByTitle(title);
    if (movieFound) {
      throw new AppError('The title exist in DB', 400);
    }
  }
);





const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _titleRequired,
  _titleNotExist,
  _calificationRequired,
  _calificationIsNumeric,
  _creationDateRequired,
  _creationDateValid,
  _roleValid,
  validationResult,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idrequired,
  _idIsNumeric,
  _idExist,
  _titleNotExist,
  _calificationIsOptional,
  _creationDateValid,
  _roleValid,
  validationResult,
];

const getRequestValidations = [
  validJWT,
  _idrequired,
  _idIsNumeric,
  _idExist,
  validationResult,
];

const getAllRequestValidations = [
  validJWT,
];

const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idrequired,
  _idIsNumeric,
  _idExist,
  validationResult,
];

module.exports = {
  postRequestValidations,
  putRequestValidations,
  getRequestValidations,
  getAllRequestValidations,
  deleteRequestValidations
};
