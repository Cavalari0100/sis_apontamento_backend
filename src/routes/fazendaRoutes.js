const express = require('express');
const router = express.Router();
const fazendaController = require('../controllers/fazendaController');

router.post('/', fazendaController.createFazenda);
router.get('/', fazendaController.getFazendas);
router.get('/:id', fazendaController.getFazendaById);
router.put('/:id', fazendaController.updateFazenda);
router.delete('/:id', fazendaController.deleteFazenda);

module.exports = router;
