const express = require('express')
const body = require('body-parser')
const sql = require('mysql2')

const app = express()
const port = 3000

app.use(express.static(__dirname + '/'))
app.use(express.static('public'))

app.use(body.json())
app.use(body.urlencoded({extended: true}))

const connection = sql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'enzospizza',
    port: 3306
})

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/finalizar', (req,res) => {
    res.sendFile(__dirname + '/finalizar.html')
})

app.post('/pedido', (req,res) => {
    res.redirect('/pizza')
})

app.post('/produto', (req,res) => {
    res.redirect('/cadastroProduto')
})

app.get('/cadastroProduto', (req,res) => {
    res.sendFile(__dirname + '/cadastro-produtos.html')
    console.log(req.body)
})

app.post('/cadastroProduto', (req,res) => {
    console.log(req.body)
    connection.query('insert into produto (nome, tipo, quantidade) values (?,?,?)',
    [req.body.nomeProduto, req.body.tipoProduto, req.body.quantidade])

    res.redirect('/finalizar')
})

app.get('/pizza', (req,res) => {
    res.sendFile(__dirname + '/pizzas.html')
})

var tamanho, sabor1, sabor2, sabor3, sabor4, valor

app.post('/pizza', (req,res) => {
    console.log(req.body.tamanho, req.body.sabor1, req.body.sabor2, req.body.sabor3, req.body.sabor4)
    tamanho = req.body.tamanho
    sabor1 = req.body.sabor1 //50
    sabor2 = req.body.sabor2 //70
    sabor3 = req.body.sabor3 // 90
    sabor4 = req.body.sabor4 // 110 funcionando
    if (tamanho == 'p') {
        valor = 50
    } else if (tamanho == 'm') {
        valor = 70
    } else if (tamanho == 'g') {
        valor = 90
    } else {
        valor = 110
    }
    connection.query('insert into pedido (valor, tamanho, sabor1, sabor2, sabor3, sabor4, retiradaEntrega) values (?,?,?,?,?,?,?)', 
    [valor,tamanho,sabor1,sabor2,sabor3,sabor4,req.body.entrega])

    connection.query('insert into cliente (cpf,nome,sobrenome,nascimento,cep,uf,localidade,bairro,logradouro,numero,complemento) values (?,?,?,?,?,?,?,?,?,?,?)',
    [req.body.cpf, req.body.nome, req.body.sobrenome, req.body.nascimento, req.body.cep, req.body.uf, 
    req.body.localidade, req.body.bairro, req.body.logradouro, req.body.num, req.body.complemento]);

    res.redirect('/finalizar')
})

app.get('/api/consultarProdutos', (req,res) => {
    connection.query('select * from produto', (err,results,fields) => {
        res.json(results)
    })
})

app.post('/consultaProduto', (req,res) => {
    res.sendFile(__dirname + '/consulta-produto.html');
})

app.get('/api/consultarPedidos', (req,res) => {
    connection.query('select * from pedido', (err,results,fields) => {
        res.json(results)
        })
})

app.post('/consultaPedido', (req,res) => {
    res.sendFile(__dirname + '/consulta-pedido.html')
})

app.post('/')

app.listen(port, () => {
    console.log(`Peça já sua pizza na porta ${port}!`)
})
