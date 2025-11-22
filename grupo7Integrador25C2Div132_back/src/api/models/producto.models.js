/*
MODELOS DE PRODUCTO
*/

import connection from "../database/db.js";

// traer todos los productos
const seleccionarProductos = () => {   // pasamos la sentencia sql en una constante separada del endpoint para modularizar y tenerla aparte en caso de tener que usarla mas adelante
    const sql = "SELECT * FROM productos";

    return connection.query(sql);
};


// traer producto por id
const seleccionarProductoPorId = (id) => {
        // ? son placeholders, lugar donde entra un valor
        let sql = "SELECT * FROM productos WHERE productos.id = ?"; // LIMIT 1: limitar resultados de la consulta

    return connection.query(sql , [id]); //[id] array que cambia por cada id pedido
};

// crear nuevo producto
const insertarProducto = (nombre, img_url, tipo, precio) => {
    let sql = "INSERT INTO productos (nombre, img_url, tipo, precio) VALUES (?, ?, ?, ?)"; //consulta

    return connection.query(sql, [nombre, img_url, tipo, precio]); // hacemos la conexion a la base de datos
};










export default {
    seleccionarProductos,
    seleccionarProductoPorId,
    insertarProducto
};

// exportamos la conexion y la respuesta de cada peticion a los controladores