const { Op } = require('sequelize');
const Character = require('../models/characters');
const Movie = require('../models/movies');

class CharacterRepository {
  constructor() { }

  //TODO: Implementar filtro
  async findAll({ name, age, weigth }, options) {

    let where = {};
    if (name) {
      where.name = {
        [Op.like]: `%${name}%`
      }
    }
    if (age) {
      where.age = {
        [Op.eq]: age
      }
    }
    if (weigth) {
      where.weigth = {
        [Op.eq]: weigth
      }
    }

    let config = {
      where,
      attributes: ['image', 'name']
    }
    return await Character.findAll(config)
  }

  async findById(id) {
    return await Character.findByPk(id);
  }
  async findByIdWithMovies(id) {
    return await Character.findByPk(id, {
      include: [
        {
          model: Movie,
          as: "movies"
        },
      ],
    });
  }



  async findByName(name) {
    return await Character.findOne({ where: { name } });
  }

  async save(character) {
    return await Character.create(character);
  }

  async update(id, character) {
    return await Character.update(character, {
      where: {
        id
      }
    });
  }

  async remove(id) {
    return await Character.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = CharacterRepository;
