const { pool } = require("../config");
const { request, response } = require("express");

const getFornecedores = (request, response) => {
    pool.query("select * from fornecedores order by codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os fornecedores: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

module.exports.getFornecedores = getFornecedores;

const addFornecedor = (request, response) => {
    const { nome , cnpj, telefone, cep } = request.body

    pool.query(
        'insert into fornecedores (nome, cnpj, telefone, cep) values ($1, $2, $3, $4)',
        [nome, cnpj, telefone, cep],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir os fornecedores: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Fornecedor criado.' })
        }        
    )
}

module.exports.addFornecedor = addFornecedor;


const updateFornecedor = (request, response) => {
    const { codigo, nome , cnpj, telefone, cep } = request.body

    pool.query(
        'update fornecedores set nome = $1, cnpj = $2, telefone = $3, cep = $4 where codigo = $5',
        [nome, cnpj, telefone, cep, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar os fornecedores: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Fornecedor atualizado.' })
        }        
    )
}

module.exports.updateFornecedor = updateFornecedor;

const deleteFornecedor = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from fornecedores where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover o fornecedor: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Fornecedor removido.' })
        }        
    )
}

module.exports.deleteFornecedor = deleteFornecedor;

const getFornecedorPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select * from fornecedores where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar o fornecedor: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

module.exports.getFornecedorPorCodigo = getFornecedorPorCodigo;