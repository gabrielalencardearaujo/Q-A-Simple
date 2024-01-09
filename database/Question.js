const Sequelize = require('sequelize');
const connection = require('./database');

// Criando uma tabela no MySQL com dois campos: title e describe.
const Question = connection.define('questions', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  describe: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
})

// Executando o comando Question, a opcao force impede a recriacao da tabela caso ja exista:
Question.sync({force: false})
.then(() => {
  console.log('Tabela criada.')
})
.catch((err) => {
  console.error('Ocorreu um erro na criacao da tabela.', err)
}); 

module.exports = Question;