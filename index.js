const express = require('express')
const cors = require('cors')
const { pool } = require('./config')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

const controleFornecedor = require('./controladores/fornecedores')
const controleMercadoria = require('./controladores/mercadorias')

app
    .route('/fornecedores')
    .get(controleFornecedor.getFornecedores)
    .post(controleFornecedor.addFornecedor)
    .put(controleFornecedor.updateFornecedor)

app
    .route('/fornecedores/:codigo')
    .get(controleFornecedor.getFornecedorPorCodigo)
    .delete(controleFornecedor.deleteFornecedor)


app
    .route('/mercadorias')
    .get(controleMercadoria.getMercadorias)
    .post(controleMercadoria.addMercadoria)
    .put(controleMercadoria.updateMercadoria)

app
    .route('/mercadorias/:codigo')
    .get(controleMercadoria.getMercadoriaPorCodigo)
    .delete(controleMercadoria.deleteMercadoria)    

    
app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor rodando na porta 3002')
})