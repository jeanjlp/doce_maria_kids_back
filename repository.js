const Pool = require('pg').Pool;
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database:'doce_maria_kids_db',
        password: '0268',
        port: 5432,
     });

     const getLogins = (request, response) => {
         pool.query('select * from login order by id desc', (error, results) =>{
             if (error){
                 throw error
             }
             response.status(200).json(results.rows)
         })
     }

     const getLoginId = (request, response) => {
         const id = parseInt(request.params.id)

        pool.query('select * from login where id = $1', [id], (error, results) => {
            if (error){
                throw error
            }
            response.status(200).json(results.rows)
        })
    }

    const createLogin = (request, response) => {
        const {usuario, senha} = request.body
        
        pool.query('insert into login(usuario, senha) values($1, $2)', [usuario, senha], (error, results) => {
            if (error){
                throw error
            }
            response.status(201).send('Login criado com suscesso.')
        })
    }

    const validaLogin = (request, response) => {
        const {usuario, senha} = request.body
        
        pool.query('select * from login where usuario = $1 and senha = $2', [usuario, senha], (error, results) => {
            if (error){
                throw error
            }
            if (results.rows.length == 1) {
                response.status(200).send('Login valido.')
            } else {
                response.status(400).send('Login invalido.')
            }
            
        })
    }

    const updateLogin = (request, response) => {
        const id = parseInt(request.params.id)
        const {usuario, senha} = request.body

        pool.query(
            'update login set usuario = $1, senha = $2 where id = $3',
            [usuario, senha, id],
            (error, result) =>{
                if(error){
                    throw error
                }
                response.status(200).send(`Login ${id} atualizado como sucesso.`)
            }
        )
    }

    const deletLogin = (request, response) => {
        const id =  parseInt(request.params.id)

        pool.query('delete from login where id = $1',[id], (error, result) => {
            if (error){
                throw error
            }
            response.status(200).send(`Login removido com sucesso com o identificador: ${id}`)
        })
    }

    //PRODUTO

    const getProdutos = (request, response) => {
        pool.query('SELECT * FROM produto ORDER BY id DESC', (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
      }
      
      const getProdutoById = (request, response) => {
        const id = parseInt(request.params.id)
      
        pool.query('SELECT * FROM produto WHERE id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
      }
      
      const createProduto = (request, response) => {
        const { descricao, tamanho, valor_compra, valor_venda, quantidade } = request.body
      
        pool.query('INSERT INTO produto (descricao, tamanho, valor_compra, valor_venda, quantidade) VALUES ($1, $2, $3, $4, $5)',
             [descricao, tamanho, valor_compra, valor_venda, quantidade], (error, result) => {
          if (error) {
            throw error
          }
          response.status(201).send(`Produto criado com sucesso.`)
        })
      }
      
      const updateProduto = (request, response) => {
        const id = parseInt(request.params.id)
        const { descricao, tamanho, valor_compra, valor_venda, quantidade } = request.body
      
        pool.query(
          'UPDATE produto SET descricao = $1, tamanho = $2, valor_compra = $3, valor_venda = $4, quantidade = $5 WHERE id = $6',
          [descricao, tamanho, valor_compra, valor_venda, quantidade, id],
          (error, result) => {
            if (error) {
              throw error
            }
            response.status(200).send(`Produto ${id} atualizada com sucesso.`)
          }
        )
      }
      
      const deleteProduto = (request, response) => {
        const id = parseInt(request.params.id)
      
        pool.query('DELETE FROM produto WHERE id = $1', [id], (error, result) => {
          if (error) {
            throw error
          }
          response.status(200).send(`Produto removido com sucesso com o identificador: ${id}`)
        })
      }


    module.exports = {getLogins, getLoginId, createLogin, validaLogin, updateLogin, deletLogin,
        getProdutos,
        getProdutoById,
        createProduto,
        updateProduto,
        deleteProduto
    }
