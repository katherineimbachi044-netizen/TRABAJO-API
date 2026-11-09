
const express = require('express');
const UsuariosController = require('../CONTROLLERS/UsuarioControllers');

module.exports = (conexion) => {

    const router = express.Router();
    const usuarios = new UsuariosController(conexion);

    router.post('/', usuarios.guardar);
    router.get('/', usuarios.traer);
    router.get('/:id', usuarios.buscar);
    router.put('/:id', usuarios.actualizar);
    router.delete('/:id', usuarios.eliminar);

    return router;
};
