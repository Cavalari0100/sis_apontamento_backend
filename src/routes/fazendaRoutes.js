const express = require('express');
const router = express.Router();
const fazendaController = require('../controllers/fazendaController');
const verificarToken = require('../middleware/authMiddleware');


router.post('/', verificarToken,fazendaController.createFazenda);
router.get('/', verificarToken,fazendaController.getFazendas);
router.get('/:id', verificarToken,fazendaController.getFazendaById);
router.put('/:id', verificarToken,fazendaController.updateFazenda);
router.delete('/:id', verificarToken,fazendaController.deleteFazenda);
router.get('/tamanho/total', verificarToken,fazendaController.getTotalPorFazenda);

module.exports = router;
