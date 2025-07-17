const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');
const verificarToken = require('../middleware/authMiddleware');
const verificarPermissao = require('../middleware/verificarPermissao');

router.post('/',verificarToken, verificarPermissao(['admin']),funcionarioController.createFuncionario);
router.get('/', verificarToken,verificarPermissao(['admin']),funcionarioController.getFuncionarios);
router.get('/:id', verificarToken,verificarPermissao(['admin']),funcionarioController.getFuncionarioById);
router.put('/:id', verificarToken,verificarPermissao(['admin']),funcionarioController.updateFuncionario);
router.delete('/:id', verificarToken,verificarPermissao(['admin']),funcionarioController.deleteFuncionario);

module.exports = router;