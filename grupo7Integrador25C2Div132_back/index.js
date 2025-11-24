import express from "express";
const app = express();
import environments from "./src/api/config/environments.js";
import cors from "cors"; 
// Importamos las rutas de producto
import { productoRoutes } from "./src/api/routes/index.js";

import productoModels from "./src/api/models/producto.models.js";

// Importamos la configuracion para trabajar con rutas y archivos estaticos
import { join, __dirname } from "./src/api/utils/index.js";


const PORT = environments.port;

/*===================
    Middlewares
===================*/
app.use(cors());

// Middleware que convierte los datos "application/json" 
app.use(express.json()); 

// Middleware para servir archivos estaticos: construimos la ruta relativa para servir los archivos de la carpeta /public
app.use(express.static(join(__dirname, "src", "public"))); // Gracias a esto podemos servir los archivos de la carpeta public, como http://localhost:3000/img/haring1.png

/*===================
    Configuracion
===================*/
app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src", "views")); // Le indicamos la ruta donde estan las vistas ejs


// Devolveremos vistas
app.get("/admin", async (req, res) => {

    try {
        const [rows] = await productoModels.seleccionarProductos();
        
        // Le devolvemos la pagina index.ejs
        res.render("index", {
            title: "Indice",
            about: "Lista de productos",
            productos: rows
        }); 

    } catch (error) {
        console.log(error);
    }
});

app.get("/consultar", (req, res) => {
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id:"
    });
});


app.get("/crear", (req, res) => {
    res.render("crear", {
        title: "Crear",
        about: "Crear producto"
    });
});


app.get("/modificar", (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    });
})


app.get("/eliminar", (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    });
})

// Ahora las rutas las gestiona el middleware Router
app.use("/api/productos", productoRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});