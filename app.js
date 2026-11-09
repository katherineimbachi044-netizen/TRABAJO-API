const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());


// conexion a mysql

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1728Benavides',
    database: 'taller_api',
    port: 3306
});

conexion.connect((error) => {
    if (error) {
        console.log('Error al conectar con MySQL:', error);
    } else {
        console.log('Conexión a MySQL exitosa');
    }
});


// importar rutas

const ProductosRoutes = require('./ROUTES/ProductosRoutes')
const PruebaRoutes = require('./ROUTES/PruebaRoutes');
const UsuariosRoutes = require('./ROUTES/UsuarioRoutes');

// registrar rutas

app.use('/pruebas', PruebaRoutes);
app.use('/usuarios', UsuariosRoutes(conexion));
app.use('/productos',ProductosRoutes(conexion));


// iniciar servidor

app.listen(3000, () => {
    console.log('Servidor funcionando en el puerto 3000');
});

