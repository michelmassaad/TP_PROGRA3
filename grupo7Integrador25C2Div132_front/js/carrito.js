let contenedorCarrito = document.getElementById("contenedor-carrito");

//Logica de Carrito
function mostrarCarrito(){
    let cartaCarrito = ""; // inicializamos una lista para los productos seleccionados y se muestra el titulo carrito
    
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<div class="carrito-vacio"><h3>Aún no has agregado jugadores ni sobres a tu carrito!!</h3> <a href="productos.html">Ver Productos...</a></div>`;
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
    contenedorCarrito.innerHTML = cartaCarrito; // innerHTML convierte un string en HTML
    // console.table(carrito);
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