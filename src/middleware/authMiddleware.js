const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo_super_seguro';

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer token_aqui"

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token inválido ou expirado' });
  }
}

module.exports = verificarToken;
