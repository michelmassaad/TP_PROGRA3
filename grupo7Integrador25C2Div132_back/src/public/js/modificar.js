let getProductos_formulario = document.getElementById("getProductos-formulario");
let listado_productos = document.getElementById("listado-productos");
let contenedor_formulario = document.getElementById("contenedor-formulario");
let url = "http://localhost:3000/api/productos";


getProductos_formulario.addEventListener("submit", async (event) => {
    
    event.preventDefault(); // Prevenimos el envio por defecto del formulario

    let formData = new FormData(event.target); // FormData { id → "2" }

    let data = Object.fromEntries(formData.entries()); // Object { id: "2" }

    let idProducto = data.id;

    try {
        // Hago el fetch a la url personalizada
        let response = await fetch(`${url}/${idProducto}`);

        // Proceso los datos que me devuelve el servidor
        let datos = await response.json();

        // Extraigo el producto que devuelve payload
        let producto = datos.payload[0]; // Apuntamos a la respuesta, vamos a payload que trae el array con el objeto y extraemos el primer y unico elemento

        // Le pasamos el producto a una funcion que lo renderice en la pantalla
        mostrarProducto(producto); 

    } catch (error) {
        console.error("Error: ", error);
    }
});

function mostrarProducto(producto) {
    let htmlProducto = `
        <li class="li-listados">
            <img src="${producto.img_url}" alt="${producto.nombre}" class="img-listados">
            <p>Id: ${producto.id}/ Nombre: ${producto.nombre}/ <strong>Precio: $${producto.precio}</strong></p>
        </li>
        <li class="li-botonera">
            <input type="button" id="actualizarProducto_boton" value="Actualizar producto">
        </li>
        `;

    listado_productos.innerHTML = htmlProducto;

    let actualizarProducto_boton = document.getElementById("actualizarProducto_boton");

    actualizarProducto_boton.addEventListener("click", event => {
        crearFormularioPut(event, producto);
    });
}


function crearFormularioPut(event, producto) {

    event.stopPropagation(); // Evitamos la propagacion de eventos

    let formularioPutHtml = `
        <form id="actualizarProductos-formulario" class="productos-formulario-amplio">

            <input type="hidden" name="id" value="${producto.id}">

            <label for="nombreProducto">Nombre</label>
            <input type="text" name="nombre" id="nombreProducto" value="${producto.nombre}" required>
            <br>

            <label for="imagenProducto">Imagen</label>
            <input type="text" name="img_url" id="imagenProducto" value="${producto.img_url}" required>
            <br>

            <label for="categoriaProducto">Categoria</label>
            <select name="tipo" id="categoriaProducto" required>
                <option value="FIGURITAS">Figuritas</option>
                <option value="ACCESORIOS">Accesorios</option>
            </select>
            <br>

            <label for="precioProducto">Precio</label>
            <input type="number" name="precio" id="precioProducto" value="${producto.precio}" required>
            <br>

            <label for="productoActivo">Activo</label>
            <select name="activo" id="productoActivo" required>
                <option value="1">Con Stock</option>
                <option value="0">Sin Stock</option>
            </select>
            <br>

            <input type="submit" value="Actualizar producto">
        </form>
    `;

    contenedor_formulario.innerHTML = formularioPutHtml;

    document.getElementById("categoriaProducto").value = producto.tipo; // traemos los valores actualizados de la bdd
    
    document.getElementById("productoActivo").value = producto.activo;

    let actualizarProductos_formulario = document.getElementById("actualizarProductos-formulario");

    actualizarProductos_formulario.addEventListener("submit", event => {
        actualizarProducto(event)
    });
};


async function actualizarProducto(event) {
    event.preventDefault();

    let url = "http://localhost:3000/api/productos";

    let formData = new FormData(event.target); // Guardamos los datos en un objeto FormData

    let data = Object.fromEntries(formData.entries()); // Transformamos el objeto FormData en un objeto JS

    try {
        let response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = await response.json(); 

        if(response.ok) { 
            alert(result.message);

            // Vaciamos el formulario y el listado
            listado_productos.innerHTML = "";
            contenedor_formulario.innerHTML = "";

        } else {
            alert(error.message);
        }

    } catch (error) {
        alert("Error al procesar la solicitud");
    }

};