import bcrypt from "bcrypt";

// Traemos el modelo de productos con un nombre
import usuarioModelo from "../models/usuario.models.js"; 

// POST -> Crear nuevo usuario
export const crearUsuario = async (req, res) => {

    try {
        // Extraemos e imprimimos los datos del body para ver si llegan correctamente
        let { correo, password } = req.body;

        // Optimizacion 1: Validamos datos de entrada
        if(!correo || !password ) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos"
            });
        }

        //Setup bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);

        // antes de hashear
        // let [rows] = await userModels.insertUsuario(correo, password);

        // despues de hashear la password
        let [rows] = await usuarioModelo.insertarUsuario(correo, hashedPassword);
        

        // Devolvemos una repuesta con codigo 201 Created
        res.status(201).json({
            message: "Usuario creado con exito!",
        });

    } catch (error) {
        console.log("Error al crear Usuario: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}