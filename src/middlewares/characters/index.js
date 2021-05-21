const { check } = require('express-validator');
const AppError = require('../../errors/appError');
const characterService = require('../../services/characterService');
const { ROLES, ADMIN_ROLE } = require('../../constants');
const { validationResult } = require('../commons');
const { validJWT, hasRole } = require('../auth');


const _nameRequired = check('name', 'Name required').not().isEmpty();

const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailValid = check('email', 'Email is invalid').isEmail();
const _emailExist = check('email').custom(
	async (email = '') => {
		const userFound = await userService.findByEmail(email);
		if (userFound) {
			throw new AppError('Email already exist in DB', 400);
		}
	}
);

const _optionalEmailValid = check('email', 'Email is invalid').optional().isEmail();
const _optionalEmailExist = check('email').optional().custom(
	async (email = '') => {
		const userFound = await userService.findByEmail(email);
		if (userFound) {
			throw new AppError('Email already exist in DB', 400);
		}
	}
);



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
		const characterFound = await characterService.findById(id);
		if (!characterFound) {
			throw new AppError('The id does not exist in DB', 400);
		}
	}
);

const _ageIsNumeric = check('age').optional().isNumeric();
const _weigthIsNumeric = check('weigth').optional().isNumeric();
const _historyRequired = check('history').not().isEmpty();
const _nameNotExist = check('name').custom(
	async (name = '') => {
		const characterFound = await characterService.findByName(name);
		if (characterFound) {
			throw new AppError('The name exist in DB', 400);
		}
	}
);





const postRequestValidations = [
	validJWT,
	hasRole(ADMIN_ROLE),
	_nameRequired,
	_nameNotExist,
	_ageIsNumeric,
	_historyRequired,
	_weigthIsNumeric,
	_roleValid,
	validationResult,
];

const putRequestValidations = [
	validJWT,
	hasRole(ADMIN_ROLE),
	_idrequired,
	_idIsNumeric,
	_idExist,
	_nameNotExist,
	_ageIsNumeric,
	_weigthIsNumeric,
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
