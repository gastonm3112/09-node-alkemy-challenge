const ContentTypeRepository = require('../repositories/contentTypeRepository');
const repository = new ContentTypeRepository();

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