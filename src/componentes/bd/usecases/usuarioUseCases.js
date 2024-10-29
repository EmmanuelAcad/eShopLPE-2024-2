const { pool } = require("../config");
const Usuario = require("../entities/Usuario");

const autenticaUsuarioDB = async (objeto) => {
  try {
    const { email, senha } = objeto;
    const results = await pool.query(
      `SELECT * FROM usuarios
            WHERE email = $1 AND senha = $2`,
      [email, senha]
    );
    if (results.rowCount == 0) {
      throw "Usuário ou senha inválidos";
    }
    const usuario = results.rows[0];
    return new Usuario(
      usuario.email,
      usuario.tipo,
      usuario.telefone,
      usuario.nome
    );
  } catch (err) {
    throw "Erro ao autenticar o usuário: " + err;
  }
};

const autenticaUsuarioPorEmailDB = async (email) => {
  try {
    const results = await pool.query(
      `SELECT * FROM usuarios
            WHERE email = $1`,
      [email]
    );
    if (results.rowCount == 0) {
      throw "Usuário inválido";
    }
    const usuario = results.rows[0];
    return new Usuario(
      usuario.email,
      usuario.tipo,
      usuario.telefone,
      usuario.nome
    );
  } catch (err) {
    throw "Erro ao autenticar o usuário: " + err;
  }
};

const criarUsuarioDB = async (objeto) => {
  try {
    const { email, senha, tipo, telefone, nome } = objeto;

    const emailExists = await pool.query(
      `SELECT * FROM usuarios WHERE email = $1`,
      [email]
    );
    if (emailExists.rowCount > 0) {
      throw "Email já está em uso";
    }

    const results = await pool.query(
      `INSERT INTO usuarios (email, senha, tipo, telefone, nome)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [email, senha, tipo, telefone, nome]
    );

    return new Usuario(
      results.rows[0].email,
      results.rows[0].tipo,
      results.rows[0].telefone,
      results.rows[0].nome
    );
  } catch (err) {
    throw "Erro ao criar usuário: " + err;
  }
};

const atualizarUsuarioDB = async (objeto) => {
  try {
    const { email, senha, telefone, nome } = objeto;
    const results = await pool.query(
      `UPDATE usuarios SET senha = $1, tipo = $2, telefone = $3, nome = $4
            WHERE email = $5 RETURNING *`,
      [senha, tipo, telefone, nome, email]
    );
    if (results.rowCount === 0) {
      throw "Usuário não encontrado";
    }
    return new Usuario(
      results.rows[0].email,
      results.rows[0].tipo,
      results.rows[0].telefone,
      results.rows[0].nome
    );
  } catch (err) {
    throw "Erro ao atualizar usuário: " + err;
  }
};

module.exports = { autenticaUsuarioDB, criarUsuarioDB, atualizarUsuarioDB };
