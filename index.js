const repository = require('./repository')


const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
  console.log(`Servidor rodando na porta de conexão ${port}.`)
})

app.get('/', (request, response) => {
    response.json({ aplicacao: 'CRUD' })
  })

  app.get('/login', repository.getLogins)
    app.get('/login/:id', repository.getLoginId)
    app.post('/login', repository.createLogin)
    app.post('/valida-login', repository.validaLogin)
    app.put('/login/:id', repository.updateLogin)
    app.delete('/login/:id', repository.deletLogin)

    app.post('/produto', repository.createProduto)
    app.get('/produto/:id', repository.getProdutoId)
    app.put('/Produto/:id', repository.updateProduto)
    app.delete('/Produto/:id', repository.deleteProduto)