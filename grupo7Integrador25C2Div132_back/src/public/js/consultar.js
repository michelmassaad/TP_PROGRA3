let getProductos_formulario = document.getElementById("getProductos-formulario");
let listado_productos = document.getElementById("listado-productos");
let url = "http://localhost:3000/api/productos";


getProductos_formulario.addEventListener("submit", async (event) => {
    
    event.preventDefault(); // Prevenimos el envio por defecto del formulario

    // Optimizacion, validar con un REGEX y limpiar informacion (OJO)

    // Guardamos En Form Data recibiendo el html del event.target
    let formData = new FormData(event.target); // FormData { id → "2" }

    // Convertimos el Objeto Form data en un objeto JS
    let data = Object.fromEntries(formData.entries()); // Object { id: "2" }

    // Del objeto data tomamos el id
    let idProducto = data.id;

    try {

        // Hago el fetch a la url personalizada
        let response = await fetch(`${url}/${idProducto}`);
        
        // Proceso los datos que me devuelve el servidor
        let result = await response.json();

        if(response.ok) {
            let producto = result.payload[0]; // extraemos el primer y unico elemento

            // Le pasamos el producto a una funcion que lo renderice en la pantalla
            mostrarProducto(producto); 

        } else {
            mostrarError(result.message);
        }

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
        `;

    listado_productos.innerHTML = htmlProducto;
}


function mostrarError(message) {
    listado_productos.innerHTML = `
        <li class="mensaje-error">
            <p>
                <strong>Error:</strong>
                <span>${message}</span>
            </p>
        </li>
    `;
};