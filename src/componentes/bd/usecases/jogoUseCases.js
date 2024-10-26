const { pool } = require("../config");
const Jogo = require("../entities/Jogo");

const getJogosDB = async () => {
  try {
    const { rows } = await pool.query(`SELECT j.codigo AS codigo, 
                j.titulo AS titulo, j.genero AS genero, j.preco AS preco, 
                j.produtora AS produtora, p.nome AS produtora_nome
                FROM jogos j
                JOIN produtoras p ON p.codigo = j.produtora
                ORDER BY j.titulo`);
    return rows.map(
      (jogo) =>
        new Jogo(
          jogo.codigo,
          jogo.titulo,
          jogo.genero,
          jogo.preco,
          jogo.produtora,
          jogo.produtora_nome
        )
    );
  } catch (err) {
    throw "Erro: " + err;
  }
};

const deleteJogoDB = async (codigo) => {
  try {
    const results = await pool.query(`DELETE FROM jogos WHERE codigo = $1`, [
      codigo,
    ]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
    } else {
      return `Jogo removido com sucesso!`;
    }
  } catch (err) {
    throw "Erro ao remover o jogo: " + err;
  }
};

const addJogoDB = async (objeto) => {
  try {
    const { titulo, genero, preco, produtora } = objeto;
    await pool.query(
      `INSERT INTO jogos (titulo, genero, preco, produtora) 
            VALUES ($1, $2, $3, $4)`,
      [titulo, genero, preco, produtora]
    );
  } catch (err) {
    throw "Erro ao inserir o jogo: " + err;
  }
};

const updateJogoDB = async (objeto) => {
  try {
    const { codigo, titulo, genero, preco, produtora } = objeto;
    const results = await pool.query(
      `UPDATE jogos SET titulo = $2, 
            genero = $3, preco = $4, produtora = $5 
            WHERE codigo = $1`,
      [codigo, titulo, genero, preco, produtora]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
    }
  } catch (err) {
    throw "Erro ao alterar o jogo: " + err;
  }
};

const getJogoPorCodigoDB = async (codigo) => {
  try {
    const results = await pool.query(
      `SELECT j.codigo AS codigo, 
                j.titulo AS titulo, j.genero AS genero, j.preco AS preco, 
                j.produtora AS produtora, p.nome AS nome_produtora
                FROM jogos j
                JOIN produtoras p ON p.codigo = j.produtora
                WHERE j.codigo = $1`,
      [codigo]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo}`;
    } else {
      const jogo = results.rows[0];
      return new Jogo(
        jogo.codigo,
        jogo.titulo,
        jogo.genero,
        jogo.preco,
        jogo.produtora,
        jogo.nome_produtora
      );
    }
  } catch (err) {
    throw "Erro ao recuperar o jogo: " + err;
  }
};

module.exports = {
  getJogosDB,
  deleteJogoDB,
  addJogoDB,
  updateJogoDB,
  getJogoPorCodigoDB,
};
