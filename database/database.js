require('dotenv').config();
const Sequelize = require('sequelize');


// Uso do sequelize para se conectar com banco de dados mysql.
const connection = new Sequelize(process.env.DATABASE, 'root', process.env.PASSWORD_ROOT, {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;