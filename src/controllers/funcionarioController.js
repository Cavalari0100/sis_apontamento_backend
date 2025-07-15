const pool = require('../models/db');

//CREATE
exports.createFuncionario = async (req, res) => {
    const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO funcionario (nome) VALUES ($1) RETURNING *',
      [nome]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LIST
exports.getFuncionarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM funcionario');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH BY ID
exports.getFuncionarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM funcionario WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateFuncionario = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const result = await pool.query(
      'UPDATE funcionario SET nome = $1 WHERE id = $2 RETURNING *',
      [nome, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteFuncionario = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM funcionario WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json({ message: 'Funcionário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};