const express = require('express');
const router = express.Router();

const PruebaController = require('../CONTROLLERS/PruebaControllers');
const prueba = new PruebaController();

router.get('/Bienvenida', prueba.Bienvenida)
router.get('/Verificar', prueba.Verificar);
router.post('/Recibir', prueba.Recibir);
router.post('/Sumar', prueba.Sumar);

module.exports = router;