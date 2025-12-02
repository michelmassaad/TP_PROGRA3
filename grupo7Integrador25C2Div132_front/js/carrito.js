let contenedorCarrito = document.getElementById("contenedor-carrito");

//Logica de Carrito
function mostrarCarrito(){
    let cartaCarrito = "<h2>Carrito</h2><ul>"; // inicializamos una lista para los productos seleccionados y se muestra el titulo carrito
    
    carrito.forEach((item, indice) => { // utilizamos forEach para iterar por los indices de las productos seleccionadas
        cartaCarrito += 
        `<li class="bloque-item">
            <p class="nombre-item"> ${item.nombre} - ${item.precio}</p>
            <button class="boton-eliminar" onclick='eliminarProducto(${indice})'>Eliminar</button>
        </li>`
    });

                        // captura el evento al apretar el boton de vaciar  carrito y ejecuta la funcion
    cartaCarrito += `</ul><div id="carritoFinal"> <button class="botonVaciar"onclick='vaciarCarrito()'> Vaciar carrito </button> 
                    <p class= "cartaCarrito">Total:  $ ${calcularTotalPrecioCarrito()}</p></div>`; 
    
    contenedorCarrito.innerHTML = cartaCarrito; // innerHTML convierte un string en HTML
    // console.table(carrito);
}

function eliminarProducto(indice){

    carrito.splice(indice, 1); // elimina un solo elemento seleccionado por indice

    if (carrito.length > 0) {
        mostrarCarrito();
    }
    else {
        contenedorCarrito.innerHTML = "";
    }
    //guarda el carrito en la memoria de la sesion 
    guardarCarritoEnStorage();
    actualizarContador();

}

function vaciarCarrito(){
    carrito = []; // se vuelve a asignar un array vacio
    contenedorCarrito.innerHTML = ""; // actualizamos la pantalla
    //guarda el carrito en la memoria de la sesion 
    guardarCarritoEnStorage();
    actualizarContador();
}


function calcularTotalPrecioCarrito() {
    let total = 0;

    carrito.forEach(elemento => { // por cada elemento que esta en el carrito se van sumando los precios
        total += elemento.precio;
    });
    return total;

};


function init (){
    mostrarCarrito();
}

init();