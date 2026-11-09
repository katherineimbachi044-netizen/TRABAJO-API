const express = require('express');
const ProductosControllers = require('../CONTROLLERS/ProductosControllers');

module.exports = (conexion) => {
    const router = express.Router();
    const productos = new ProductosControllers(conexion);

    router.post('/', productos.guardar);
    router.get('/', productos.traer);

    router.get('/agotados', productos.agotados);
    router.get('/bajo-stock', productos.bajoStock);

    router.get('/:id', productos.buscar);
    router.put('/:id', productos.actualizar);
    router.delete('/:id', productos.eliminar);

    return router;
};