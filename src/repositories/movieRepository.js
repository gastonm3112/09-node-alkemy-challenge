const Movie = require('../models/movies');

class MovieRepository {
  constructor() { }

  //TODO: Implementar filtro
  async findAll() {
    return await Movie.findAll();
  }

  async findById(id) {
    return await Movie.findByPk(id);
  }


  async findByTitle(title) {
    return await Movie.findOne({ where: { title } });
  }

  async save(movie) {
    return await Movie.create(movie);
  }

  async update(id, movie) {
    return await Movie.update(movie, {
      where: {
        id
      }
    });
  }

  async remove(id) {
    return await Movie.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = MovieRepository;
