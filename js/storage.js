
const CLAVE_STORAGE = "calendarioNotas";


function obtenerNotas() {
    const datos = localStorage.getItem(CLAVE_STORAGE);
    if (!datos) return [];
    return JSON.parse(datos);
}


function guardarNotas(notas) {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(notas));
}

function limpiarNotas() {
    localStorage.removeItem(CLAVE_STORAGE);
}

function obtenerNotasPorMes(mes) {
    return obtenerNotas().filter(function (nota) {
        return nota.mes === mes;
    });
}


function crearNota(mes, titulo, descripcion) {
    const notas = obtenerNotas();
    const nuevaNota = {
        id: Date.now().toString(),
        mes: mes,
        titulo: titulo,
        descripcion: descripcion,
        creadaEn: Date.now()
    };
    notas.push(nuevaNota);
    guardarNotas(notas);
}


function editarNota(id, titulo, descripcion) {
    const notas = obtenerNotas();
    const indice = notas.findIndex(function (nota) {
        return nota.id === id;
    });
    if (indice === -1) return;
    notas[indice].titulo = titulo;
    notas[indice].descripcion = descripcion;
    guardarNotas(notas);
}


function eliminarNota(id) {
    const notas = obtenerNotas().filter(function (nota) {
        return nota.id !== id;
    });
    guardarNotas(notas);
}