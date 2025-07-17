const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verificarPermissao = require('../middleware/verificarPermissao');

router.post('/register',verificarPermissao(['admin', 'funcionario']), authController.register);
router.post('/login', authController.login);

module.exports = router;
