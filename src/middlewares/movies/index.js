const { check } = require('express-validator');
const AppError = require('../../errors/appError');
const movieService = require('../../services/movieService');
const characterService = require('../../services/characterService');
const contentTypeService = require('../../services/contentTypeService');
const genderTypeService = require('../../services/genderTypeService');
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


const _idrequired = (name) => {
  return check(name).not().isEmpty();
}
const _idIsNumeric = (name) => {
  return check(name).isNumeric();
}
const _idExist = check('id').custom(
  async (id = '') => {
    const movieFound = await movieService.findById(id);
    if (!movieFound) {
      throw new AppError('The id does not exist in DB', 400);
    }
  }
);

const _idCharacterExist = check('idCharacter').custom(
  async (idCharacter = '') => {
    const characterFound = await characterService.findById(idCharacter);
    if (!characterFound) {
      throw new AppError('The character id does not exist in DB', 400);
    }
  }
);

const _idMovieExist = check('idMovie').custom(
  async (idMovie = '') => {
    const movieFound = await movieService.findById(idMovie);
    if (!movieFound) {
      throw new AppError('The movie id does not exist in DB', 400);
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

const _contentTypeExistValidation = async (contentType = '') => {
  const contentTypeFound = await contentTypeService.findByDescription(contentType);
  if (!contentTypeFound) {
    throw new AppError('The content type does not exist in DB', 400);
  }
};

const _genderTypeExistValidation = async (genderType = '') => {
  const genderTypeFound = await genderTypeService.findByDescription(genderType);
  if (!genderTypeFound) {
    throw new AppError('The gender type does not exist in DB', 400);
  }
};

const _contentTypeExist = check('contentType').custom(_contentTypeExistValidation);
const _genderTypeExist = check('genderType').custom(_genderTypeExistValidation);
const _contentTypeExistAndOptional = check('contentType').optional().custom(_contentTypeExistValidation);
const _genderTypeExistAndOptional = check('genderType').optional().custom(_genderTypeExistValidation);





const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _titleRequired,
  _titleNotExist,
  _calificationRequired,
  _calificationIsNumeric,
  _creationDateRequired,
  _creationDateValid,
  _contentTypeExist,
  _genderTypeExist,
  _roleValid,
  validationResult,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idrequired('id'),
  _idIsNumeric('id'),
  _idExist,
  _titleNotExist,
  _calificationIsOptional,
  _creationDateValid,
  _contentTypeExistAndOptional,
  _genderTypeExistAndOptional,
  _roleValid,
  validationResult,
];

const getRequestValidations = [
  validJWT,
  _idrequired('id'),
  _idIsNumeric('id'),
  _idExist,
  validationResult,
];

const getAllRequestValidations = [
  validJWT,
];

const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idrequired('id'),
  _idIsNumeric('id'),
  _idExist,
  validationResult,
];

const associationRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idrequired('idCharacter'),
  _idIsNumeric('idCharacter'),
  _idCharacterExist,
  _idrequired('idMovie'),
  _idIsNumeric('idMovie'),
  _idMovieExist,
  _roleValid,
  validationResult,
]

module.exports = {
  postRequestValidations,
  putRequestValidations,
  getRequestValidations,
  getAllRequestValidations,
  deleteRequestValidations,
  associationRequestValidations
};
