const { pool }  = require('../config');
const Produto = require('../entities/Produto');

const getProdutosDB = async () => {
    try {
        const { rows } = await pool.query(`select p.codigo as codigo, 
            p.nome as nome, p.descricao as descricao, 
            p.quantidade_estoque as quantidade_estoque, 
            p.ativo as ativo, p.valor as valor, 
            to_char(p.data_cadastro,'YYYY-MM-DD') as data_cadastro, 
            p.categoria as categoria, c.nome as categoria_nome
            from produtos p
            join categorias c on p.categoria = c.codigo
            order by p.codigo`);
        return rows.map((produto) =>
            new Produto(produto.codigo, produto.nome, produto.descricao,
                produto.quantidade_estoque, produto.ativo, produto.valor,
                produto.data_cadastro, produto.categoria, produto.categoria_nome));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const deleteProdutoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM categorias WHERE
            codigo = $1`,[codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return `Produto removida com sucesso!`;
        }
    } catch (err){
        throw 'Erro ao remover a categoria: ' + err;
    }
}

const addProdutoDB = async (objeto) => {
    try {
        const { nome } = objeto;
        await pool.query(`INSERT INTO categorias (nome) VALUES ($1)`,[nome]);
    } catch(err){
        throw 'Erro ao inserir a categoria: ' + err;
    }
}

const updateProdutoDB = async (objeto) => {
    try {
        const { codigo, nome } = objeto;
        const results = await pool.query(`UPDATE categorias SET nome = $2 
            WHERE codigo = $1`,
            [codigo, nome]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
    } catch(err){
        throw 'Erro ao alterar a categoria: ' + err;
    }
}

const getProdutoPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM categorias where 
            codigo =  $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const categoria = results.rows[0];
            return new Produto(categoria.codigo, categoria.nome)
        }
    } catch(err){
        throw 'Erro ao recuperar a categoria: ' + err;
    }
}

module.exports = { getProdutosDB, deleteProdutoDB, addProdutoDB,
     updateProdutoDB, getProdutoPorCodigoDB}