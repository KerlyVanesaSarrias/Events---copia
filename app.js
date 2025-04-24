const inputTarea = document.getElementById("exampleFormControlInput1")
const inputDescripcion = document.getElementById("exampleFormControlTextarea1")
const btnAgregar = document.getElementById("btnAgregar")
const listaTareas = document.getElementById("ListaTareas")
const mensajeError = document.getElementById("mensajeError")
const EliminarTodo = document.getElementById("btnEliminarTodo")



function guardarTareas(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas))
}

function obtenerTareas() {
  return JSON.parse(localStorage.getItem("tareas"))
}


function mostrarTareas() {
  listaTareas.innerHTML = "";
  const tareas = obtenerTareas()
  tareas.forEach((tarea, index) => {
    const li = document.createElement("li")
    li.className = "tarea-item"

    const contenido = document.createElement("div");
    contenido.className = "tarea-contenido";
    contenido.innerHTML = `<strong>${tarea.nombre}</strong><br><span>${tarea.descripcion}</span>`

    contenido.addEventListener("click", () => {
      contenido.classList.toggle("completada")
    });

    const botonEliminar = document.createElement("button")
    botonEliminar.className = "btn btn-sm btn-danger"
    botonEliminar.innerHTML = '<i class="bi bi-trash"></i>'
    botonEliminar.addEventListener("click", () => {
      const tareas = obtenerTareas()
      tareas.splice(index, 1)
      guardarTareas(tareas)
      mostrarTareas()
    });

    li.appendChild(contenido)
    li.appendChild(botonEliminar)
    listaTareas.appendChild(li)
  });
}

btnAgregar.addEventListener("click", (e) => {
  e.preventDefault()

  const nombre = inputTarea.value.trim()
  const descripcion = inputDescripcion.value.trim()

  if (!nombre) {
    mensajeError.innerHTML = `<div class="alert alert-danger mt-2">Por favor, escribe una tarea.</div>`
    return
  }

  mensajeError.innerHTML = ""
  const tareas = obtenerTareas()
  tareas.push({ nombre, descripcion });
  guardarTareas(tareas)
  mostrarTareas()

  inputTarea.value = ""
  inputDescripcion.value = ""
});



EliminarTodo.addEventListener("click", () => {
  const tareas = obtenerTareas()
  tareas.length = 0
  guardarTareas(tareas)
  mostrarTareas()
}



)

window.addEventListener("DOMContentLoaded", mostrarTareas);

