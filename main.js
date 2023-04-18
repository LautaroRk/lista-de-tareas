// Función para agregar una tarea a la lista
function agregarTarea() {
  // Obtener los datos ingresados por el usuario
  const nombreTarea = document.getElementById('inputTarea').value;

  // Verificar que se haya ingresado un nombre de tarea
  if (nombreTarea === '') {
    alert('Por favor ingrese un nombre de tarea');
    return;
  }

  // Obtener la lista de tareas almacenadas en localStorage
  let listaTareas = JSON.parse(localStorage.getItem('listaTareas')) || [];

  // Obtener el mayor id de las tareas almacenadas en localStorage
  const id = listaTareas.length > 0 ? Math.max(...listaTareas.map(t => t.id)) + 1 : 1;

  // // Agregar la nueva tarea al principio de la lista
  // listaTareas.unshift({
  //   id: id,
  //   nombre: nombreTarea,
  //   completada: false
  // });

  // Agregar la nueva tarea al final de la lista
  listaTareas.push({
    id: id,
    nombre: nombreTarea,
    completada: false
  });

  // Guardar la lista de tareas actualizada en localStorage
  localStorage.setItem('listaTareas', JSON.stringify(listaTareas));

  // Limpiar el campo de nombre de tarea en el formulario
  document.getElementById('tarea').value = '';

  // Actualizar la lista de tareas en la página
  mostrarTareas();
}

// Función para obtener la lista de tareas almacenadas en localStorage y mostrarlas en la página
function mostrarTareas() {
  // Obtener el template del elemento tarea
  const templateTarea = document.getElementById('tareaTemplate');

  // Obtener la lista de tareas almacenadas en localStorage
  const listaTareas = JSON.parse(localStorage.getItem('listaTareas')) || [];

  console.log(listaTareas);

  // Obtener los elementos donde se mostrarán las tareas
  const listaTareasElemento = document.getElementById('listaTareas');
  const listaTareasCompletadasElemento = document.getElementById('listaTareasCompletadas');

  // Limpiar las listas de tareas en la página
  listaTareasElemento.innerHTML = '';
  listaTareasCompletadasElemento.innerHTML = '';

  // Agregar cada tarea de la lista a la página
  listaTareas.forEach(tarea => {
    // Clonar el template del elemento tarea
    const tareaElemento = templateTarea.content.cloneNode(true);

    // Obtener el checkbox del elemento tarea
    const checkboxElemento = tareaElemento.querySelector('.checkboxTarea');
    // Marcar el checkbox como completado si la tarea está completada
    if (tarea.completada) {
      checkboxElemento.checked = true;
    } else {
      checkboxElemento.checked = false;
    }

    // Agregar el evento de clic al checkbox
    checkboxElemento.addEventListener('click', () => completarTarea(tarea));

    // Obtener el nombre de la tarea
    const nombreTareaElemento = tareaElemento.querySelector('.nombreTarea');
    // Agregar el nombre de la tarea
    nombreTareaElemento.textContent = tarea.nombre;

    // Obtener el botón de eliminar tarea
    const botonEliminarElemento = tareaElemento.querySelector('.eliminarTarea');
    // Agregar el evento de clic al botón de eliminar tarea
    botonEliminarElemento.addEventListener('click', () => eliminarTarea(tarea));

    // Agregar el elemento tarea a la lista de tareas que corresponda
    if (tarea.completada) {
      listaTareasCompletadasElemento.appendChild(tareaElemento);
    } else {
      listaTareasElemento.appendChild(tareaElemento);
    }
  });

  // Si no hay tareas, ocultar las secciones de tareas
  if (listaTareas.length === 0) {
    document.querySelectorAll('.contenedorListado').forEach(contenedor => {
      contenedor.classList.add('ocultar');
    });
  } else {
    document.querySelectorAll('.contenedorListado').forEach(contenedor => {
      contenedor.classList.remove('ocultar');
    });

    // Si no hay tareas completadas, ocultar la sección de tareas completadas
    if (listaTareas.filter(tarea => tarea.completada).length === 0) {
      document.getElementById('contenedorTareasCompletadas').classList.add('ocultar');
    } else {
      document.getElementById('contenedorTareasCompletadas').classList.remove('ocultar');
    }
  }
}

// Función para marcar una tarea como completada o incompleta
function completarTarea(tarea) {
  // Obtener la lista de tareas almacenadas en localStorage
  let listaTareas = JSON.parse(localStorage.getItem('listaTareas')) || [];

  // Obtener la tarea de la lista
  const tareaEncontrada = listaTareas.find((t) => t.id === tarea.id);

  // Marcar la tarea como completada o incompleta
  tareaEncontrada.completada = !tareaEncontrada.completada;

  // Guardar la lista de tareas actualizada en localStorage
  localStorage.setItem('listaTareas', JSON.stringify(listaTareas));

  // Actualizar la lista de tareas en la página
  mostrarTareas();
}

// Función para eliminar una tarea de la lista
function eliminarTarea(tarea) {
  // Obtener la lista de tareas almacenadas en localStorage
  let listaTareas = JSON.parse(localStorage.getItem('listaTareas')) || [];

  // Eliminar la tarea de la lista
  listaTareas = listaTareas.filter((t) => t.nombre !== tarea.nombre);
  
  // Guardar la lista de tareas actualizada en localStorage
  localStorage.setItem('listaTareas', JSON.stringify(listaTareas));

  // Actualizar la lista de tareas en la página
  mostrarTareas();
}

// Función para invertir el orden del listado
function invertirOrden() {
  // Obtener la lista de tareas almacenadas en localStorage
  let listaTareas = JSON.parse(localStorage.getItem('listaTareas')) || [];

  // Invertir el orden de la lista de tareas
  listaTareas = listaTareas.reverse();

  // Guardar la lista de tareas actualizada en localStorage
  localStorage.setItem('listaTareas', JSON.stringify(listaTareas));

  // Actualizar la lista de tareas en la página
  mostrarTareas();
}

// Función para limpiar todas las tareas de la lista
function limpiarTareas() {
  // Limpiar la lista de tareas en localStorage
  localStorage.setItem('listaTareas', JSON.stringify([]));

  // Actualizar la lista de tareas en la página
  mostrarTareas();
}

// Agregar el evento de clic al botón de agregar tarea
document.getElementById('agregarTarea').addEventListener('click', agregarTarea);

// Agregar el evento de clic al botón de invertir el orden del listado
document.getElementById('invertirOrden').addEventListener('click', invertirOrden);

// Agregar el evento de clic al botón de eliminar todas las tareas
document.getElementById('limpiarTareas').addEventListener('click', limpiarTareas);

// Mostrar la lista de tareas al cargar la página
mostrarTareas();
