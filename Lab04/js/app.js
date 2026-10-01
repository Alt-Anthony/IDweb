const tareas = [];
const formulario = document.getElementById('formulario');
const listaTareas = document.getElementById('lista-tareas');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    tareas.push({
        id: Date.now(),
        titulo: document.getElementById('titulo').value,
        curso: document.getElementById('curso').value,
        fechaEntrega: document.getElementById('fechaEntrega').value,
        completada: false
    });

    formulario.reset();
    mostrarTareas();
});

function mostrarTareas() {
    //Recorre las tareas con map
    listaTareas.innerHTML = tareas.map(tarea => `
        <li>
            <strong>${tarea.titulo}</strong>
            <br> - Curso:${tarea.curso} 
            <br> - Fecha de Entrega: ${tarea.fechaEntrega}
        </li>
    `).join('');
}