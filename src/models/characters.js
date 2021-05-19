const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const Character = sequelize.define('Character', {
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  weigth: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  history: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
},
  {
    //Model Options
  });

Character.belongsToMany(Movies, {
  through: 'CharacterMovies',
  as: 'movies',
  foreignKey: 'characterId'
});


module.exports = Character;

