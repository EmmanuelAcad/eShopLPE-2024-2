const { pool } = require("../config");
const Produtora = require("../entities/Produtora");

const getProdutorasDB = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM produtoras ORDER BY nome`);
    return rows.map(
      (produtora) =>
        new Produtora(produtora.codigo, produtora.nome, produtora.sede)
    );
  } catch (err) {
    throw "Erro: " + err;
  }
};

const deleteProdutoraDB = async (codigo) => {
  try {
    const results = await pool.query(
      `DELETE FROM produtoras WHERE codigo = $1`,
      [codigo]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
    } else {
      return `Produtora removida com sucesso!`;
    }
  } catch (err) {
    throw "Erro ao remover a produtora: " + err;
  }
};

const addProdutoraDB = async (objeto) => {
  try {
    const { nome, sede } = objeto;
    await pool.query(`INSERT INTO produtoras (nome, sede) VALUES ($1, $2)`, [
      nome,
      sede,
    ]);
  } catch (err) {
    throw "Erro ao inserir a produtora: " + err;
  }
};

const updateProdutoraDB = async (objeto) => {
  try {
    const { codigo, nome, sede } = objeto;
    const results = await pool.query(
      `UPDATE produtoras SET nome = $2, sede = $3 WHERE codigo = $1`,
      [codigo, nome, sede]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
    }
  } catch (err) {
    throw "Erro ao alterar a produtora: " + err;
  }
};

const getProdutoraPorCodigoDB = async (codigo) => {
  try {
    const results = await pool.query(
      `SELECT * FROM produtoras WHERE codigo = $1`,
      [codigo]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo}`;
    } else {
      const produtora = results.rows[0];
      return new Produtora(produtora.codigo, produtora.nome, produtora.sede);
    }
  } catch (err) {
    throw "Erro ao recuperar a produtora: " + err;
  }
};

module.exports = {
  getProdutorasDB,
  deleteProdutoraDB,
  addProdutoraDB,
  updateProdutoraDB,
  getProdutoraPorCodigoDB,
};
