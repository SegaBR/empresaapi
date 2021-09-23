const { pool } = require("../config");
const { request, response } = require("express");

const getMercadorias = (request, response) => {
    pool.query("select l.codigo as codigo, l.nome as nome, l.preco_custo as preco_custo, l.preco_venda as preco_venda, l.estoque as estoque, \
    l.fornecedor as fornecedor, e.nome as fornecedor_nome \
    from mercadorias l \
    join fornecedores e on e.codigo = l.fornecedor order by l.codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar as mercadorias: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

module.exports.getMercadorias = getMercadorias;

const addMercadoria = (request, response) => {
    const { nome , preco_custo, preco_venda, estoque, fornecedor } = request.body

    pool.query(
        'insert into mercadorias (nome , preco_custo, preco_venda, estoque, fornecedor) values ($1, $2, $3, $4, $5)',
        [nome , preco_custo, preco_venda, estoque, fornecedor],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir a mercadoria: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Mercadoria criada.' })
        }        
    )
}

module.exports.addMercadoria = addMercadoria;


const updateMercadoria = (request, response) => {
    const { codigo, nome, preco_custo, preco_venda, estoque, fornecedor } = request.body

    pool.query(
        'update mercadorias set nome = $1, preco_custo = $2, preco_venda = $3, estoque = $4, fornecedor = $5 where codigo = $6',
        [nome , preco_custo, preco_venda, estoque, fornecedor, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar a mercadoria: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Mercadoria atualizada.' })
        }        
    )
}

module.exports.updateMercadoria = updateMercadoria;

const deleteMercadoria = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from mercadorias where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover a mercadoria: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Mercadoria removida.' })
        }        
    )
}

module.exports.deleteMercadoria = deleteMercadoria;

const getMercadoriaPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select l.codigo as codigo, l.nome as nome, l.preco_custo as preco_custo, l.preco_venda as preco_venda, l.estoque as estoque, \
        l.fornecedor as fornecedor, e.nome as fornecedor_nome \
        from mercadorias l \
        join fornecedores e on e.codigo = l.fornecedor where l.codigo = $1 order by l.codigo ',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar a mercadoria: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

module.exports.getMercadoriaPorCodigo = getMercadoriaPorCodigo;