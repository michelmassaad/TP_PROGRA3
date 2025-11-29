// variables
let cantidadCarrito = document.getElementById("cantidadCarrito");
let contenedorCarrito = document.getElementById("contenedor-carrito");
let barraBusqueda = document.getElementById("barraBusqueda");
let contenedorProductos = document.getElementById("contenedor-productos");

const url = "http://localhost:3000/api/productos/activos"; // Guardamos en una variable la url de nuestro endpoint

let productos = [];
let carrito = [];

//Logica de obtencion de datos del servidor con fetch
async function obtenerProductos() {
    try {
        let respuesta = await fetch(url); // Hacemos una peticion a nuestro nuevo endpoint en "http://localhost:3000/api/productos/activos"

        let data = await respuesta.json();

        productos = data.payload; // Aca guardamos en la variable productos el array de productos que contiene "payload"

        mostrarProductos(productos);

    } catch(error) {
        console.error(error);
    }
}

// funcion para mostrar productos actualizando el html
function mostrarProductos(array) {
    let htmlProducto = "";

    array.forEach(producto => {
        htmlProducto += `
        <div class="carta-producto">
            <div class="carta-imagen">
                <img src="${producto.img_url}" alt="${producto.nombre}">
            </div>
            <div class="carta-texto">
                <h5>${producto.nombre}</h5>
                <div class="carta-id-precio">
                    <button class="botonAgregarCarrito" onclick = "agregarACarrito(${producto.id})"> 
                        <!-- svg carrito -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </button> 
                    <p>$${producto.precio}</p>
                </div>
            </div>
        </div>
        `;
    });

    contenedorProductos.innerHTML = htmlProducto;
}

//Logica de Busqueda

barraBusqueda.addEventListener("keyup", () => {  // capturamos el evento keyup dentro de la barra de busqueda para filtrar por productos 
    filtrarProductos();
})

function filtrarProductos(){
    // let productos = await obtenerProductos();
    // console.log(productos);
    let valorBusqueda = barraBusqueda.value.toLowerCase();
    
    let productosFiltrados = productos.filter(prod => 
        prod.nombre.toLowerCase().includes(valorBusqueda)
    );
    
    /*
    prod devuelve cada objeto de la iteracion
    prod.nombre devuelve cada nombre de cada objeto
    prod.nombre.includes verifica si lo que esta adentro de includes existe dentro del valor busqueda
    */

    mostrarProductos(productosFiltrados);
};

//Logica de Filtros

barraBusqueda.addEventListener("keyup", () => {  // capturamos el evento keyup dentro de la barra de busqueda para filtrar por productos 
    filtrarProductos();
})

function filtrarPorCategoria(tipo){
    // let productos = await obtenerProductos();
    // console.log(productos);
    let categoriaActual = tipo;
    
    let productosFiltrados;

    if (categoriaActual === 'TODOS') {
        productosFiltrados = productos;  //mostramos la lista completa
    
    }else {
        productosFiltrados = productos.filter(prod => prod.tipo === tipo);
    }

    // 3. Renderizamos la nueva lista filtrada
    mostrarProductos(productosFiltrados);

    // 4. (Opcional) Actualizar estilo de los botones para que se vea cuál está activo
    actualizarBotonesActivos(tipo);
};

function actualizarBotonesActivos(tipoSeleccionado) {    
    let botones = document.querySelectorAll('.filtro-boton');

    botones.forEach(boton => {
        // Quitamos la clase 'activo' de todos
        boton.classList.remove('activo');
        
        // Si el botón tiene el onclick con el tipo seleccionado, le ponemos 'activo'
        if (boton.getAttribute('onclick').includes(tipoSeleccionado)) {
            boton.classList.add('activo');
        }
    });
}





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
    
    contenedorCarrito.innerHTML = cartaCarrito; // innerHTML: convierte un string en HTML

    
    console.table(carrito);
}

function agregarACarrito(id){
    
    let productoSeleccionado = productos.find(prod => prod.id === id); // compara el id del array original con el de la fruta seleccionada
    carrito.push(productoSeleccionado);
    
    // localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContador();

    alert("Producto agregado al carrito correctamente")
}


function eliminarProducto(indice){

    carrito.splice(indice, 1); // elimina un solo elemento seleccionado por indice

    if (carrito.length > 0) {
        mostrarCarrito();
    }
    else {
        contenedorCarrito.innerHTML = "";
    }
    actualizarContador();

}

function vaciarCarrito(){
    carrito = []; // se vuelve a asignar un array vacio
    contenedorCarrito.innerHTML = ""; // actualizamos la pantalla
    actualizarContador();
}

function actualizarContador() {
    cantidadCarrito.innerHTML = `<p id="cantidadCarritoTexto"> (${carrito.length})</p>`; // actualizamos para ver por pantalla un parrafo con la cantidad de elementos que hay en el carrito
}


function calcularTotalPrecioCarrito() {
    let total = 0;

    carrito.forEach(elemento => { // por cada elemento que esta en el carrito se van sumando los precios
        total += elemento.precio;
    });

    return total;

};


function init (){
    obtenerProductos();
    actualizarContador();
}

init();