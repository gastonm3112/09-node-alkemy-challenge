const MovieRepository = require('../repositories/movieRepository');
const repository = new MovieRepository();

const findById = async (id) => {
  return await repository.findById(id);
};

const findByTitle = async (title) => {
  return await repository.findByTitle(title);
};

const findAll = async (filter, options) => {
  // return await repository.findAllWithPagination(filter, options);
  return await repository.findAll();
};

const save = async (movie) => {
  return await repository.save(movie);
};

const update = async (id, movie) => {
  return await repository.update(id, movie);
};

const remove = async (id) => {
  return await repository.remove(id);
};

module.exports = {
  findById,
  findByTitle,
  findAll,
  save,
  update,
  remove,
};
