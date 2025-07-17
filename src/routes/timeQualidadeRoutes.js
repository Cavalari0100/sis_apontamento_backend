const express = require('express');
const router = express.Router();
const controller = require('../controllers/timeQualidadeController');
const verificarToken = require('../middleware/authMiddleware');
const verificarPermissao = require('../middleware/verificarPermissao');

router.post('/', verificarToken, verificarPermissao(['admin', 'funcionario']),controller.criar);
router.get('/lista', verificarToken,verificarPermissao(['admin', 'funcionario']),controller.listarMenbrosQualidade);

module.exports = router;
