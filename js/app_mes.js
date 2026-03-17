// =========================================
// APP_MES.JS — Lógica de mes.html
// =========================================

const NOMBRES_MESES = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Leer el parámetro ?mes= de la URL
const params = new URLSearchParams(window.location.search);
const mesActual = Number(params.get("mes"));

// =========================================
// INICIALIZACIÓN
// =========================================

/**
 * Comprueba que el parámetro mes es válido (1-12).
 * Si no lo es, redirige a index.html.
 */
function inicializar() {
  if (!mesActual || mesActual < 1 || mesActual > 12) {
    window.location.href = "index.html";
    return;
  }

  document.title = "Notas de " + NOMBRES_MESES[mesActual - 1];
  document.getElementById("titulo-mes").textContent = "Notas de " + NOMBRES_MESES[mesActual - 1];
  renderizarNotas();
}

// =========================================
// RENDERIZADO DE NOTAS
// =========================================

/**
 * Renderiza en #lista-notas las notas del mes actual.
 */
function renderizarNotas() {
  const lista = document.getElementById("lista-notas");
  const notas = obtenerNotas().filter(function(n) { return n.mes === mesActual; });
  lista.innerHTML = "";

  if (notas.length === 0) {
    const item = document.createElement("li");
    item.classList.add("sin-notas");
    item.textContent = "No hay notas para este mes.";
    lista.appendChild(item);
    return;
  }

  notas.forEach(function(nota) {
    const item = document.createElement("li");
    item.classList.add("tarjeta-nota");

    const contenidoNota = document.createElement("div");
    contenidoNota.classList.add("contenido-nota");

    const titulo = document.createElement("h3");
    titulo.textContent = nota.titulo;

    const descripcion = document.createElement("p");
    descripcion.textContent = nota.descripcion;

    contenidoNota.appendChild(titulo);
    contenidoNota.appendChild(descripcion);

    const accionesNota = document.createElement("div");
    accionesNota.classList.add("acciones-nota");

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btn-neutro");
    btnEditar.dataset.id = nota.id;
    btnEditar.addEventListener("click", function() {
      activarModoEdicion(nota.id);
    });

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn-peligro");
    btnEliminar.dataset.id = nota.id;
    btnEliminar.addEventListener("click", function() {
      eliminarNota(nota.id);
    });

    accionesNota.appendChild(btnEditar);
    accionesNota.appendChild(btnEliminar);

    item.appendChild(contenidoNota);
    item.appendChild(accionesNota);
    lista.appendChild(item);
  });
}

// =========================================
// FORMULARIO — VALIDACIÓN Y GUARDADO
// =========================================

/**
 * Valida los campos del formulario.
 * Muestra los errores en la web si hay campos vacíos.
 * @returns {boolean} true si todo es válido
 */
function validarFormulario() {
  const titulo = document.getElementById("input-titulo").value.trim();
  const descripcion = document.getElementById("input-descripcion").value.trim();
  const errorTitulo = document.getElementById("error-titulo");
  const errorDescripcion = document.getElementById("error-descripcion");
  let valido = true;

  if (titulo === "") {
    errorTitulo.classList.remove("oculto");
    valido = false;
  } else {
    errorTitulo.classList.add("oculto");
  }

  if (descripcion === "") {
    errorDescripcion.classList.remove("oculto");
    valido = false;
  } else {
    errorDescripcion.classList.add("oculto");
  }

  return valido;
}

/**
 * Maneja el click en "Guardar nota".
 * Si hay un ID en el campo oculto, edita. Si no, crea.
 */
function guardarNota() {
  if (!validarFormulario()) return;

  const titulo = document.getElementById("input-titulo").value.trim();
  const descripcion = document.getElementById("input-descripcion").value.trim();
  const id = document.getElementById("input-id").value;

  const notas = obtenerNotas();

  if (id) {
    // Modo edición: buscar la nota por ID y actualizar
    const indice = notas.findIndex(function(n) { return n.id === id; });
    if (indice !== -1) {
      notas[indice].titulo = titulo;
      notas[indice].descripcion = descripcion;
    }
  } else {
    // Modo creación: crear nota nueva
    const nuevaNota = {
      id: Date.now().toString(),
      mes: mesActual,
      titulo: titulo,
      descripcion: descripcion,
      creadaEn: Date.now()
    };
    notas.push(nuevaNota);
  }

  guardarNotas(notas);
  limpiarFormulario();
  renderizarNotas();
}

// =========================================
// EDITAR NOTA
// =========================================

/**
 * Rellena el formulario con los datos de la nota a editar
 * y muestra el botón cancelar.
 * @param {string} id
 */
function activarModoEdicion(id) {
  const notas = obtenerNotas();
  const nota = notas.find(function(n) { return n.id === id; });
  if (!nota) return;

  document.getElementById("input-titulo").value = nota.titulo;
  document.getElementById("input-descripcion").value = nota.descripcion;
  document.getElementById("input-id").value = nota.id;
  document.getElementById("titulo-formulario").textContent = "Editar nota";
  document.getElementById("btn-guardar").textContent = "Actualizar nota";
  document.getElementById("btn-cancelar").classList.remove("oculto");

  // Desplazar la vista al formulario
  document.getElementById("input-titulo").focus();
  document.querySelector(".seccion-formulario").scrollIntoView({ behavior: "smooth" });
}

// =========================================
// ELIMINAR NOTA
// =========================================

/**
 * Pide confirmación y elimina la nota con el ID dado.
 * @param {string} id
 */
function eliminarNota(id) {
  const confirmado = confirm("¿Seguro que quieres eliminar esta nota?");
  if (!confirmado) return;

  const notas = obtenerNotas().filter(function(n) { return n.id !== id; });
  guardarNotas(notas);
  renderizarNotas();
}

// =========================================
// LIMPIAR FORMULARIO
// =========================================

/**
 * Resetea el formulario al estado inicial (modo creación).
 */
function limpiarFormulario() {
  document.querySelector("#input-titulo").value = "";
  document.querySelector("#input-descripcion").value = "";
  document.querySelector("#input-id").value = "";
  document.querySelector("#error-titulo").classList.add("oculto");
  document.querySelector("#error-descripcion").classList.add("oculto");
  document.querySelector("#titulo-formulario").textContent = "Nueva nota";
  document.querySelector("#btn-guardar").textContent = "Guardar nota";
  document.querySelector("#btn-cancelar").classList.add("oculto");
}

// =========================================
// EVENTOS
// =========================================

document.querySelector("#btn-guardar").addEventListener("click", guardarNota);
document.querySelector("#btn-cancelar").addEventListener("click", limpiarFormulario);

// =========================================
// INICIO
// =========================================

inicializar();