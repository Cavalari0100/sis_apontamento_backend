const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');
const verificarToken = require('../middleware/authMiddleware');

router.post('/',verificarToken, funcionarioController.createFuncionario);
router.get('/', verificarToken,funcionarioController.getFuncionarios);
router.get('/:id', verificarToken,funcionarioController.getFuncionarioById);
router.put('/:id', verificarToken,funcionarioController.updateFuncionario);
router.delete('/:id', verificarToken,funcionarioController.deleteFuncionario);

module.exports = router;