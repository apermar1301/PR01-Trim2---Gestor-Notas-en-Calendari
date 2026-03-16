
const NOMBRES_MESES = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mallo", "Junio", "Julio", "Agosto",
  "Septimbre", "Octubre", "Noviembre", "Diciembre"
];


function renderizarMeses() {
  const contenedor = document.getElementById("cuadricula-meses");
  const notas = obtenerNotas();
  contenedor.innerHTML = "";

  for (let mes = 1; mes <= 12; mes++) {
    const notasDelMes = notas.filter(function(n) { return n.mes === mes; });
    const cantidad = notasDelMes.length;

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-mes");
    tarjeta.classList.add(cantidad > 0 ? "destacado" : "apagado");
    tarjeta.dataset.mes = mes;

    const nombre = document.createElement("span");
    nombre.classList.add("nombre-mes");
    nombre.textContent = NOMBRES_MESES[mes - 1];

    const contador = document.createElement("span");
    contador.classList.add("contador-mes");
    contador.textContent = cantidad === 1 ? "1 nota" : cantidad + " notas";

    tarjeta.appendChild(nombre);
    tarjeta.appendChild(contador);
    contenedor.appendChild(tarjeta);

    tarjeta.addEventListener("click", function() {
      window.location.href = "mes.html?mes=" + mes;
    });
  }
}


function toggleListadoGlobal() {
  const panel = document.getElementById("panel-listado");
  const lista = document.getElementById("lista-todas-notas");
  const notas = obtenerNotas();

  if (!panel.classList.contains("oculto")) {
    panel.classList.add("oculto");
    return;
  }

  lista.innerHTML = "";

  if (notas.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No hay notas guardadas.";
    item.classList.add("sin-notas");
    lista.appendChild(item);
  } else {
    notas.forEach(function(nota) {
      const item = document.createElement("li");
      item.classList.add("item-nota-global");

      const mes = document.createElement("span");
      mes.classList.add("etiqueta-mes");
      mes.textContent = NOMBRES_MESES[nota.mes - 1];

      const titulo = document.createElement("span");
      titulo.classList.add("titulo-nota");
      titulo.textContent = nota.titulo;

      item.appendChild(mes);
      item.appendChild(titulo);
      lista.appendChild(item);
    });
  }

  panel.classList.remove("oculto");
}


function limpiarCalendario() {
  const confirmado = confirm("¿Seguro que quieres eliminar todas las notas? Esta acción no se puede deshacer.");
  if (!confirmado) return;

  limpiarNotas();
  document.getElementById("panel-listado").classList.add("oculto");
  renderizarMeses();
}

document.getElementById("btn-listar").addEventListener("click", toggleListadoGlobal);
document.getElementById("btn-limpiar").addEventListener("click", limpiarCalendario);

renderizarMeses();