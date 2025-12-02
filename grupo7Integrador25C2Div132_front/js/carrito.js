let contenedorCarrito = document.getElementById("contenedor-carrito");

function mostrarCarrito(){
    
    let cartaCarrito = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<div class="carrito-vacio"><h2>Tu carrito está vacío!!</h2> <a href="productos.html">Ver Productos..</a></div>`; // innerHTML convierte un string en HTML
        return;
    }

    carrito.forEach((item, indice) => { // utilizamos forEach para iterar por los indices de las productos seleccionadas
        cartaCarrito += 
        `
        <div class="carta-producto carta-carrito">
            <div class="carta-imagen">
                <img src="${item.img_url}" alt="${item.nombre}">
            </div>
            <div class="carta-texto carta-texto-carrito">
                <h5>${item.nombre}</h5>
                <div class="carta-id-precio carta-id-precio-carrito">
                <button class="botonAgregarCarrito" onclick='eliminarProducto(${indice})'>Eliminar</button>

                    <p>$${item.precio}</p>
                </div>
            </div>
        </div>
            `
    });

                        // captura el evento al apretar el boton de vaciar  carrito y ejecuta la funcion
    cartaCarrito += `</ul><div class="carrito-final"> <button class="botonAgregarCarrito boton-vaciar-carrito" onclick='vaciarCarrito()'> Vaciar carrito </button> 
                    <p class= "precio-total-carrito">Total:  $ ${calcularTotalPrecioCarrito()}</p></div>`; 
    
    contenedorCarrito.innerHTML = cartaCarrito;
}

function eliminarProducto(indice){

    carrito.splice(indice, 1); // elimina un solo elemento seleccionado por indice

    mostrarCarrito();
    //guarda el carrito en la memoria de la sesion 
    guardarCarritoEnStorage();
    actualizarContador();

}

function vaciarCarrito(){
    carrito = []; // se vuelve a asignar un array vacio
    mostrarCarrito();
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