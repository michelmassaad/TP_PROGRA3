/*================================
    Modelos de usuario
================================*/
import connection from "../database/db.js"; // Traemos la conexion a la BBDD

// Crear nuevo producto
const insertarUsuario = (correo, password ) => {
    let sql = "INSERT INTO usuarios (correo, password ) VALUES (?, ?)";

    return connection.query(sql, [correo, password]);
}


export default {
    insertarUsuario
}