const Character = require('../models/characters');

class CharacterRepository {
  constructor() { }

  //TODO: Implementar filtro
  async findAll() {
    return await Character.findAll();
  }

  async findById(id) {
    return await Character.findByPk(id);
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
