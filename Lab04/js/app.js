let tareas = [];
const formulario = document.getElementById('formulario');
const listaTareas = document.getElementById('lista-tareas');
const alertas = document.getElementById('alerta')
const filtroSelect = document.getElementById('filtro-tareas');

function mostrarAlerta(mensaje, tipo = 'danger') {
    alertas.innerHTML = `
        <div class="alert alert-${tipo} d-flex justify-content-between align-items-center mb-3">
            <span>${mensaje}</span>
            <button type="button" class="btn-close" onclick="document.getElementById('alerta').innerHTML = ''"></button>
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
    localStorage.setItem('tareas', JSON.stringify(tareas));
    //Recorre las tareas con map
    listaTareas.innerHTML = tareas.map(tarea => {
        const tachado = tarea.completada ? 'text-decoration-line-through text-muted' : '';
        const colorFondo = tarea.completada ? 'list-group-item-success' : 'list-group-item-light';
        const btnClase = tarea.completada ? 'btn-warning' : 'btn-success';
        const btnTexto = tarea.completada ? 'Marcar Pendiente' : 'Cerrar Tarea';

        return `
            <li class="list-group-item ${colorFondo}">
                <div class="${tachado}">
                    <strong>${tarea.titulo}</strong>
                    <br> - Curso: ${tarea.curso} 
                    <br> - Fecha de Entrega: ${tarea.fechaEntrega}
                </div>
                <div class="mt-2">
                    <button class="btn ${btnClase} btn-sm me-1" onclick="alternarEstado(${tarea.id})">${btnTexto}</button>
                    <button class="btn btn-danger btn-sm" onclick="borrarTarea(${tarea.id})">✖</button>
                </div>
            </li>
        `;
    }).join('');
}
function alternarEstado(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        mostrarTareas();
    }
}

function borrarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    mostrarTareas();
}

document.addEventListener('DOMContentLoaded', () => {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
    }
    mostrarTareas();
});