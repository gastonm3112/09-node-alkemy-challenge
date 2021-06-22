const MovieRepository = require('../repositories/movieRepository');
const CharacterRepository = require('../repositories/movieRepository');
const GenderTypeRepository = require('../repositories/genderTypeRepository');
const ContentTypeRepository = require('../repositories/contentTypeRepository');
const repository = new MovieRepository();
const characterRepository = new CharacterRepository();
const genderTypeRepository = new GenderTypeRepository();
const contentTypeRepository = new ContentTypeRepository();

const findById = async (id) => {
  return await repository.findByIdWithCharacters(id);
};

const findByTitle = async (title) => {
  return await repository.findByTitle(title);
};

const findAll = async (filter, options) => {
  return await repository.findAll(filter, options);
};

const save = async (movie) => {
  const genderType = await genderTypeRepository.findByDescription(movie.genderType);
  const contentType = await contentTypeRepository.findByDescription(movie.contentType);

  movie.genderTypeId = genderType.id;
  movie.contentTypeId = contentType.id;
  return await repository.save(movie);
};

const update = async (id, movie) => {
  if (movie.genderType) {
    const genderType = await genderTypeRepository.findByDescription(movie.genderType);
    const contentType = await contentTypeRepository.findByDescription(movie.contentType);

    movie.genderTypeId = genderType.id;
    movie.contentTypeId = contentType.id;
  }

  return await repository.update(id, movie);
};

const remove = async (id) => {
  return await repository.remove(id);
};

const associate = async (movie, character) => {
  await character.addMovies(movie);
}

module.exports = {
  findById,
  findByTitle,
  findAll,
  save,
  update,
  remove,
  associate
};
