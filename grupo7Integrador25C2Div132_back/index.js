import express from "express";
const app = express();
import environments from "./src/api/config/environments.js";
import cors from "cors"; 
// Importamos las rutas de producto
import { productoRoutes, usuarioRoutes } from "./src/api/routes/index.js";
import productoModels from "./src/api/models/producto.models.js";

// Importamos la configuracion para trabajar con rutas y archivos estaticos
import { join, __dirname } from "./src/api/utils/index.js";

import session from "express-session"; // Importamos session despues de instalar npm i express-session
import { exigirLogin } from "./src/api/middlewares/middlewares.js";
import connection from "./src/api/database/db.js";
import bcrypt from "bcrypt";

const PORT = environments.port;
// Importamos session_key de environments
const session_key = environments.session_key;

/*===================
    Middlewares
===================*/
app.use(cors());

// Middleware que convierte los datos "application/json" 
app.use(express.json()); 

// Middleware para servir archivos estaticos: construimos la ruta relativa para servir los archivos de la carpeta /public
app.use(express.static(join(__dirname, "src", "public"))); // Gracias a esto podemos servir los archivos de la carpeta public, como http://localhost:3000/img/haring1.png

// Middleware para parsear las solicitudes POST que enviamos desde el <form> HTML
app.use(express.urlencoded({ extended: true }));

// Middleware de sesion 
app.use(session({
    secret: session_key, // Esto firma las cookies para evitar manipulacion, un mecanismo de seguridad que usa una key o contraseña bien fuerte y larga
    resave: false, // Esto evita guardar la sesion si no hubo cambios
    saveUninitialized: true // No guarde sesiones vacias
}));

/*===================
    Configuracion
===================*/
app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src", "views")); // Le indicamos la ruta donde estan las vistas ejs


// Devolveremos vistas
app.get("/admin", exigirLogin, async (req, res) => {

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

app.get("/consultar", exigirLogin, (req, res) => {
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id"
    });
});


app.get("/crear", exigirLogin, (req, res) => {
    res.render("crear", {
        title: "Crear",
        about: "Crear producto"
    });
});


app.get("/modificar", exigirLogin, (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    });
})


app.get("/eliminar", exigirLogin, (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    });
})

//Vista de Login

app.get("/login", (req,res) =>{
    res.render("login",{
        title:"Login",
        about:"Inicio de Sesion"
    })    
})    


app.post("/login", async(req, res) =>{
    try {
        const {correo,password} = req.body;

        if(!correo || !password){
            return res.render("login",{
                title: "Login",
                about: "Inicio de Sesion",
                error: "Todos los campos son obligatorios"
            });
        }

        //sentencia antes de bcrypt
        // const sql = "SELECT * FROM usuarios WHERE correo = ? AND password =?"
        // const [rows] = await connection.query(sql, [correo, password]);

        //Setup bcrypt parte I
        // Sentencia con bcrypt, traemos solo el email
        const sql = "SELECT * FROM usuarios WHERE correo = ? "
        const [rows] = await connection.query(sql, [correo]);


        //Validacion 
        if (rows.length === 0) {
            return res.render("login",{
                title: "Login",
                about: "Inicio de Sesion",
                error: "Credenciales incorrectas"
            });
        }

        const user = rows[0];

        //Setup bcrypt parte II Comparamos el password hasheado (la contrase;a de login hasheada es igual a la BDD?)
        const match = await bcrypt.compare(password, user.password) //si ambos hash coinciden, es porque las password son iguales y match devuelve true

        if (match) {
            //Con el correo y password validos, guardamos la sesion 
            req.session.user = {
                id:user.id,
                nombre:user.nombre,
                correo:user.correo
            }
    
            res.redirect("/admin"); //redirigimos a la pagina principal
        }else{
            return res.render("login",{
                title: "Login",
                about: "Inicio de Sesion",
                error: "Password incorrecta"
            });
        }

    } catch (error) {
        console.error("Error en el login",error);
        
    }
})


//Creamos el endpoint para destruir la sesion y redireccionar

app.post("/logout", (req,res) =>{

    // Destruimos la sesion
    req.session.destroy((err)=>{
        if (err) {
            
            // En caso de existir algun error, mandaremos una respuesta error
            console.log("Error al destruir la sesion", err);
            
            return res.status(500).json({
                error:"Error al cerrar la sesion"
            });
        }
       // Redirecciono al login principal
        res.redirect("/login");
        
    })
})

// Ahora las rutas las gestiona el middleware Router
app.use("/api/productos", productoRoutes);

// Rutas usuario
app.use("/api/usuarios", usuarioRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});