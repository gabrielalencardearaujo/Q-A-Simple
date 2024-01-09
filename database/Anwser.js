const Sequelize = require('sequelize');
const connection = require('./database');

const Anwser = connection.define('respostas', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  quesitonID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

Anwser.sync({force: false});

module.exports = Anwser;