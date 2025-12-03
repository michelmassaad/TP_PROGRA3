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
    cartaCarrito += `</ul> <p class= "precio-total-carrito">Total:  $ ${calcularTotalPrecioCarrito()}</p> <div class="carrito-final"> <button class="botonAgregarCarrito boton-vaciar-carrito" onclick='vaciarCarrito()'> Vaciar carrito </button> <button class="botonAgregarCarrito boton-ticket" onclick='imprimirTicket()'> Imprimir ticket </button></div>`; 
    
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

function imprimirTicket(){
    console.table(carrito);

    let idProductos = []; // guardamos los ids de los productos del carrito para registrar ventas

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF(); // doc tendra todos los metodos de jsPDF

    let y = 20; 

    doc.setFontSize(20);

    doc.text("Ticket de compra:" , 20, y);

    y += 20;

    doc.setFontSize(12);

    carrito.forEach(producto => {

        idProductos.push(producto.id); // llenamos el array de ids de productos

        doc.text(`${producto.nombre} - $${producto.precio}`, 40, y); // texto por cada producto

        y += 10;
    });

    const precioTotal = carrito.reduce((total, producto) => total + parseInt(producto.precio), 0); // calculamos el total del ticket

    y += 5

    doc.setFontSize(15);

    doc.text(`Total: $${precioTotal}`, 20, y);



    doc.save("ticket.pdf");
}


function init (){
    mostrarCarrito();
}

init();