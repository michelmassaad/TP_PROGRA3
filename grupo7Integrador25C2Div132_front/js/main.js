// variables

let cantidadProducto = document.querySelector("#cantidadProducto");

let contenedorCarrito = document.querySelector("#contenedorCarrito");

let barraBusqueda = document.getElementById("barraBusqueda");

    // Seleccionamos el elemento al que le vamos a inyectar el HTML
        let contenedorProductos = document.getElementById("contenedor-productos");
        const url = "http://localhost:3000/api/productos/activos"; // Guardamos en una variable la url de nuestro endpoint

        async function obtenerProductos() {
            try {
                let respuesta = await fetch(url); // Hacemos una peticion a nuestro nuevo endpoint en http://localhost:3000/api/products

                let data = await respuesta.json();

                let productos = data.payload; // Aca guardamos en la variable productos el array de productos que contiene "payload"

                mostrarProductos(productos);

            } catch(error) {
                console.error(error);
            }
        }

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
                            <button class="botonAgregarCarrito" onclick = "agregarACarrito(${producto.id})"> Agregar al carrito </button> 
                            <p>$${producto.precio}</p>
                        </div>
                    </div>
                </div>
                `;
            });

            contenedorProductos.innerHTML = htmlProducto;
        }


barraBusqueda.addEventListener("keyup", () => {  // capturamos el evento keyup dentro de la barra de busqueda para filtrar por productos 
    filtrarProductos();
})

async function filtrarProductos(){
    let productos = await obtenerProductos();
    console.log(productos);
    
    
    let valorBusqueda = barraBusqueda.value;
    
    let productosFiltrados = productos.filter(prod => prod.nombre.includes(valorBusqueda));
    
    /*
    prod devuelve cada objeto de la iteracion
    prod.nombre devuelve cada nombre de cada objeto
    prod.nombre.includes verifica si lo que esta adentro de includes existe dentro de f.nombre
    */

    mostrarProductos(productosFiltrados);
};

let carrito = [];

function mostrarCarrito(){
    let cartaCarrito = "<h2>Carrito</h2><ul>"; // inicializamos una lista para los productos seleccionados y se muestra el titulo carrito
    
    carrito.forEach((item, indice) => { // utilizamos forEach para iterar por los indices de las frutas seleccionadas
        cartaCarrito += 
        `<li class="bloque-item">
            <p class="nombre-item"> ${item.nombre} - ${item.precio}</p>
            <button class="boton-eliminar" onclick='eliminarProducto(${indice})'>Eliminar</button>
        </li>`
    });

    cartaCarrito += `</ul><div id="carritoFinal"> <button class="botonVaciar"onclick='vaciarCarrito()'> Vaciar carrito </button> <p class= "cartaCarrito">Total:  $ ${sumarPrecios()}</p></div>`; // captura el evento al apretar el boton de vaciar  carrito y ejecuta la funcion
    
    contenedorCarrito.innerHTML = cartaCarrito; // innerHTML: convierte un string en HTML

    actualizar();
    
    console.log(cartaCarrito);
    console.table(carrito);
}

function agregarACarrito(id){
    
    let productoSeleccionado = productos.find(prod => prod.id === id); // compara el id del array original con el de la fruta seleccionada
    
    carrito.push(productoSeleccionado);
    
    // localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

function eliminarProducto(indice){

    carrito.splice(indice, 1); // elimina un solo elemento seleccionado por indice

    if (carrito.length > 0) {
        mostrarCarrito();
    }
    else {
        contenedorCarrito.innerHTML = "";
    }
    actualizar();

}

function vaciarCarrito(){
    carrito = []; // se vuelve a asignar un array vacio

    contenedorCarrito.innerHTML = ""; // actualizamos la pantalla
    actualizar();
}

function actualizar() {
    cantidadProducto.innerHTML = `<p id="cantidadProducto"> ${carrito.length} Productos</p>`; // actualizamos para ver por pantalla un parrafo con la cantidad de elementos que hay en el carrito
    
}

function sumarPrecios() {
    let total = 0;

    carrito.forEach(elemento => { // por cada elemento que esta en el carrito se van sumando los precios
        total += elemento.precio;
    });

    return total;

};


function init (){
    obtenerProductos();
    imprimirDatosAlumno();
    actualizar();
}

init();