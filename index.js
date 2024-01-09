const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./database/database.js');
const QuestionModel = require('./database/Question.js');
const AnwserModel = require('./database/Anwser.js');

// Database. Conexcao com banco de dados.
connection.authenticate()
  .then(() => {
    console.log('Conexao estabelecida')
  })
  .catch((err) => {
    console.error('Ocorreu um erro:', err)
  })

// Setando o express para usar o ejs como renderizador do HTML
app.set('view engine', 'ejs');

// Usando pasta public para inserir arquivos estaticos. O express automaticamente busca os arquivos dentro da pasta public:
app.use(express.static('public'));

//Usado para "transpilar" as informacoes dos formularios para uma estrutura javascript.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Consultando valores dentro da tabela.
app.get('/', (req, res) => {
  QuestionModel.findAll({raw: true, order: [
    ['id', 'DESC'] // ASC = crescente, DESC = decrescente
  ]}).then((questions) => {
    res.render('index', {
      questions,
    })
  })
})

app.get('/ask', (req, res) => {
  res.render('perguntar');
})

app.get('/question/:id', (req, res) => {
  const id = req.params.id;
  
  QuestionModel.findOne({ // Consultando a pergunta que foi selecionada (ao clicar em responder)
    where: {id}
  }).then(question => {
    console.log(question)
    if(question) {

      AnwserModel.findAll({ // Consultando todas as respostas para a pergunta.
        where: {quesitonID: question.id},
        order: [['id', 'DESC']]
      }).then(resp => {
        res.render('questions/questionSingle', {
          question,
          anwsers: resp,
        })

      })

    } else {
      res.redirect('/')
    }
  })
})

app.post('/sendQuestion', (req, res) => {
  const { title, describe } = req.body;

  // Realiza insert no banco de dados.
  QuestionModel.create({
    title,
    describe,
  }).then(() => {
    res.redirect('/');
  })
})

app.post('/newAnwser', (req, res) => {
  const {body, quesitonID} = req.body;
  AnwserModel.create({
    body,
    quesitonID,
  }).then(() => {
    res.redirect('/question/'+ quesitonID)
  })
})

// Iniciando servidor na porta 8080
app.listen(8080, (err) => (err) ? console.error('Ocorreu um erro: ', err) : console.log('App rodando na porta: http://localhost:8080'))