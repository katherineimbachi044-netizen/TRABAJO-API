
class ProductosControllers {

    constructor(conexion) {
        this.conexion = conexion;
    }

    guardar = (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || precio === undefined || stock === undefined) {
        return res.json({ mensaje: "Faltan datos del producto" });
    }

    if (isNaN(Number(precio))) {
        return res.json({ mensaje: "El precio debe ser numérico" });
    }

    if (Number(precio) < 0) {
        return res.json({ mensaje: "El precio no puede ser negativo" });
    }

    if (Number(stock) < 0) {
        return res.json({ mensaje: "El stock no puede ser negativo" });
    }

    this.conexion.query(
        "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)",
        [nombre, descripcion, precio, stock],
        (error, resultado) => {
            if (error) {
                return res.json({ mensaje: "Error al guardar el producto" });
            } else {
                return res.json({
                    mensaje: "Producto guardado correctamente",
                    id: resultado.insertId
                });
            }
        }
    );
}

    traer = (req, res) => {
        this.conexion.query("SELECT * FROM productos", (error, resultado) => {
            if (error) {
                return res.json({ mensaje: "Error al traer los productos" });
            } else {
                return res.json(resultado);
            }
        });
    }

    buscar = (req, res) => {
        const { id } = req.params;

        this.conexion.query(
            "SELECT * FROM productos WHERE id = ?",
            [id],
            (error, resultado) => {
                if (error) {
                    return res.json({ mensaje: "Error al buscar el producto" });
                } else {
                    return res.json(resultado);
                }
            }
        );
    }

    actualizar = (req, res) => {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock } = req.body;

        this.conexion.query(
            "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?",
            [nombre, descripcion, precio, stock, id],
            (error, resultado) => {
                if (error) {
                    return res.json({ mensaje: "Error al actualizar el producto" });
                } else if (resultado.affectedRows === 0) {
                    return res.json({ mensaje: "No existe un producto con ese ID" });
                } else {
                    return res.json({ mensaje: "Producto actualizado correctamente" });
                }
            }
        );
    }

    eliminar = (req, res) => {
        const { id } = req.params;

        this.conexion.query(
            "DELETE FROM productos WHERE id = ?",
            [id],
            (error, resultado) => {
                if (error) {
                    return res.json({ mensaje: "Error al eliminar el producto" });
                } else if (resultado.affectedRows === 0) {
                    return res.json({ mensaje: "No existe un producto con ese ID" });
                } else {
                    return res.json({ mensaje: "Producto eliminado correctamente" });
                }
            }
        );
    }

    agotados = (req, res) => {
        this.conexion.query(
            "SELECT * FROM productos WHERE stock = 0",
            (error, resultado) => {
                if (error) {
                    return res.json({ mensaje: "Error al consultar los productos agotados" });
                } else {
                    return res.json(resultado);
                }
            }
        );
    }

    bajoStock = (req, res) => {
        this.conexion.query(
            "SELECT * FROM productos WHERE stock < 5",
            (error, resultado) => {
                if (error) {
                    return res.json({ mensaje: "Error al consultar los productos con bajo stock" });
                } else {
                    return res.json(resultado);
                }
            }
        );
    }

}

module.exports = ProductosControllers;
