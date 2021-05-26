const GenderTypeRepository = require('../repositories/genderTypeRepository');
const repository = new GenderTypeRepository();

const findById = async (id) => {
  return await repository.findById(id);
}

const findByDescription = async (description) => {
  return await repository.findByDescription(description);
}

module.exports = {
  findById,
  findByDescription
}