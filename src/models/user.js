const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const User = sequelize.define('Users', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  enable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
},
  {
    //Model Options
  });



module.exports = User;

