const pool = require('../models/db');

exports.criarMembro = async (nome, funcoes, criado_por) => {
  const result = await pool.query(
    'INSERT INTO time_de_qualidade (nome, funcao_no_time, criado_por) VALUES ($1, $2, $3) RETURNING *',
    [nome, funcoes, criado_por]
  );
  return result.rows[0];
};

exports.listarTime = async () => {
  const result = await pool.query('SELECT * FROM time_de_qualidade');
  return result.rows;
};
