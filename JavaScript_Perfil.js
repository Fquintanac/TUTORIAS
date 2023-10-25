document.getElementById("tutorial-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const estado = document.getElementById("estado").value;
    const video = document.getElementById("video").value;
    const fecha_creacion = document.getElementById("fecha_creacion").value;
    const usuario_creacion = document.getElementById("usuario_creacion").value;

    // Crear un objeto con los datos del tutorial
    const tutorialData = {
        titulo: titulo,
        descripcion: descripcion,
        estado: estado,
        video_url: video,
        fecha_creacion: fecha_creacion,
        usuario_creacion: usuario_creacion,
    };

    // Enviar los datos a la API para registrar el tutorial
    fetch("/agregar_tutorial", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tutorialData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Muestra un mensaje de confirmación
        // Limpia el formulario
        document.getElementById("tutorial-form").reset();
    });
});

// Función para listar los tutoriales
function listarTutoriales() {
    fetch("/listar_tutoriales")
    .then(response => response.json())
    .then(data => {
        const tutorialList = document.getElementById("tutorial-list");
        tutorialList.innerHTML = ""; // Limpia la lista actual

        data.forEach(tutorial => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <h3>${tutorial.titulo}</h3>
                <p>${tutorial.descripcion}</p>
                <p>Estado: ${tutorial.estado}</p>
                <p>Fecha de Creación: ${tutorial.fecha_creacion}</p>
                <p>Usuario de Creación: ${tutorial.usuario_creacion}</p>
                <p>Video: <a href="${tutorial.video_url}" target="_blank">Ver Tutorial</a></p>
                <button>Modificar Tutorial</button>
                <button>Eliminar Tutorial</button>
            `;
            tutorialList.appendChild(listItem);
        });
    });
}

// Llamar a la función de listar tutoriales al cargar la página
listarTutoriales();
