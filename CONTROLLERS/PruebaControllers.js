class PruebaController {
    Bienvenida = (req,res) => {
        res.json({
            mensaje: "Bienvenido a nuestra API"
        })
    }

    Verificar = (req,res) => {
        res.json({
            mensaje : "El servidor funciona correctamente",
            estado : true     
       })
    }

    Recibir = (req, res) => {
        const {nombre,edad} = req.body;
        res.json({
            mensaje : "Datos recibidos correctamente",
            nombre : nombre,
            edad : edad
        })
    }

    Sumar = (req,res) => {
        const {numero1, numero2} = req.body;

        const resultado = Number(numero1) + Number(numero2);
        res.json({
            resultado : resultado
        })
    }

}

module.exports = PruebaController;