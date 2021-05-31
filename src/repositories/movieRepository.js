const { Op } = require('sequelize');
const Movie = require('../models/movies');

class MovieRepository {
  constructor() { }

  //TODO: Implementar filtro
  async findAll({ title = '', genderTypeId = '', creationDate = '' }, { order }) {
    let where = {};
    if (title) {
      where.title = {
        [Op.like]: `%${title}%`
      }
    }
    if (genderTypeId) {
      where.genderTypeId = {
        [Op.eq]: genderTypeId
      }
    }
    if (creationDate) {
      where.creationDate = {
        [Op.eq]: creationDate
      }
    }

    let config = {
      where,
      attributes: ['image', 'title', 'creationDate'],
    }

    if (order) {
      config.order = [order.split(';')];
    }

    return await Movie.findAll(config);
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
