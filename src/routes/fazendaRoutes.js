const express = require('express');
const router = express.Router();
const fazendaController = require('../controllers/fazendaController');
const verificarToken = require('../middleware/authMiddleware');
const verificarPermissao = require('../middleware/verificarPermissao');

router.post('/', verificarToken,verificarPermissao(['admin', 'funcionario']),fazendaController.createFazenda);
router.get('/', verificarToken,verificarPermissao(['admin']),fazendaController.getFazendas);
router.get('/:id', verificarToken,fazendaController.getFazendaById);
router.put('/:id', verificarToken,verificarPermissao(['admin', 'funcionario']),fazendaController.updateFazenda);
router.delete('/:id', verificarToken,verificarPermissao(['admin', 'funcionario']),fazendaController.deleteFazenda);
router.get('/tamanho/total', verificarToken,fazendaController.getTotalPorFazenda);

module.exports = router;
