const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const Movie = sequelize.define('Movie', {
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  calification: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});



module.exports = Movie;

const Character = require('./characters');
const ContentType = require('./contentTypes');
const GenderType = require('./genderTypes');

Movie.belongsToMany(Character, {
  through: 'characterMovies',
  as: 'character',
  foreignKey: 'movieId'

});
Movie.belongsTo(ContentType, {
  foreignKey: "contentTypeId",
  targetKey: "id"
});

Movie.belongsTo(GenderType, {
  foreignKey: "genderTypeId",
  targetKey: "id"
});




