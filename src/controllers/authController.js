const pool = require('../models/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'AdminS1s@';

// Cadastro
exports.register = async (req, res) => {
  const { nome, email, senha, papel } = req.body;

  if (!nome || !email || !senha || !papel) {
    return res.status(400).json({ error: 'Preencha todos os campos' });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      `INSERT INTO users (nome, email, senha, papel)
       VALUES ($1, $2, $3, $4) RETURNING id, nome, email, papel`,
      [nome, email, senhaHash, papel]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email não encontrado' });
    }

    const user = result.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: user.id, papel: user.papel },
      SECRET,
      { expiresIn: '4h' }
    );

    res.json({ token, user: { id: user.id, nome: user.nome, papel: user.papel } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
