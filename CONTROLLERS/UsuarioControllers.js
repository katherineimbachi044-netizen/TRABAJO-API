
class UsuarioController {

    constructor(conexion) {
        this.conexion = conexion;
    }

    guardar = (req, res) => {
        const { nombre, apellido, direccion, telefono } = req.body;

        this.conexion.query(
            "INSERT INTO usuarios (nombre, apellido, direccion, telefono) VALUES (?, ?, ?, ?)",
            [nombre, apellido, direccion, telefono],
            (error, resultado) => {
                if (error) {
                    return res.json({ mensaje: "Error al guardar el usuario" });
                } else {
                    return res.json({
                        mensaje: "Usuario guardado correctamente",
                        id: resultado.insertId
                    });
                }
            }
        );
    }

    traer = (req, res) => {
        this.conexion.query("SELECT * FROM usuarios", (error, resultado) => {
            if (error) {
                return res.json({ mensaje: "Error al traer los usuarios" });
            } else {
                return res.json(resultado);
            }
        });
    }

    buscar = (req, res) => {
        const { id } = req.params;

        this.conexion.query(
            "SELECT * FROM usuarios WHERE id = ?",
            [id],
            (error, resultado) => {
                if (error) {
                    return res.json({ mensaje: "Error al buscar el usuario" });
                } else {
                    return res.json(resultado);
                }
            }
        );
    }

    actualizar = (req, res) => {
        const { id } = req.params;
        const { nombre, apellido, direccion, telefono } = req.body;

        this.conexion.query(
            "UPDATE usuarios SET nombre = ?, apellido = ?, direccion = ?, telefono = ? WHERE id = ?",
            [nombre, apellido, direccion, telefono, id],
            (error, resultado) => {
                if (error) {
                    return res.json({ mensaje: "Error al actualizar el usuario" });
                } else {
                    return res.json({ mensaje: "Usuario actualizado correctamente" });
                }
            }
        );
    }

    eliminar = (req, res) => {
        const { id } = req.params;

        this.conexion.query(
            "DELETE FROM usuarios WHERE id = ?",
            [id],
            (error, resultado) => {
                if (error) {
                    return res.json({ mensaje: "Error al eliminar el usuario" });
                } else {
                    return res.json({ mensaje: "Usuario eliminado correctamente" });
                }
            }
        );
    }
}

module.exports = UsuarioController;
