const tareas = [];
const formulario = document.getElementById('formulario');
const listaTareas = document.getElementById('lista-tareas');
const alertas = document.getElementById('alerta')


function mostrarAlerta(mensaje) {
    alertas.innerHTML = `
        <div>
            <span style="color: red;">${mensaje}</span>
            <button onclick="document.getElementById('alerta').innerHTML = ''">Cerrar</button>
        </div>
    `;
}
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();
    const curso = document.getElementById('curso').value.trim();
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    alertas.innerHTML = '';
    //Validacion de datos si es que se ingresa espacios en blanco
    if (!titulo || !curso || !fechaEntrega) {
        mostrarAlerta(`Todos los campos son olbigatorios`)
        return;
    }

    //Se compara con la fecha actual
    const fechaActual = new Date().toLocaleDateString('en-CA');
    if (fechaEntrega <= fechaActual) {
        mostrarAlerta(`La fecha de entrega debe ser posterior a ${fechaActual}`);
        return;
    }
    tareas.push({
        id: Date.now(), //El id es automatico
        titulo: titulo,
        curso: curso,
        fechaEntrega: fechaEntrega,
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