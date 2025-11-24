let altaProductos_formulario = document.getElementById("altaProductos-formulario");
let url = "http://localhost:3000/api/productos";

altaProductos_formulario.addEventListener("submit", event => {

    event.preventDefault(); // Evitamos el envio por defecto del formulario

    let formData = new FormData(event.target); // Obtenemos la data del formulario en un FormData

    let data = Object.fromEntries(formData.entries()); // Parseamos esta data del form data en un objeto JS

    enviarProducto(data);
});

async function enviarProducto(data) {
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Procesamos la respuesta que nos devuelve
        let result = await response.json();

        // Vamos a verificar si la conexion fue exitosa con un "200" OK o "201" Created
        if(response.ok) {
            alert(result.message);

        } else { // En caso de que haya otra respuesta distinta de ok
            alert(result.message);
        }

    } catch (error) {
        alert("Error al procesar la solicitud");
    }
}