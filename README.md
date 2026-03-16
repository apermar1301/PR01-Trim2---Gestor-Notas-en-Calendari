# Calendario de Notas

Aplicación web para gestionar notas asociadas a los meses del año.

## Descripción

Permite visualizar un calendario anual con los 12 meses. Al entrar en un mes se pueden crear, editar y eliminar notas. Las notas se guardan en el navegador mediante `localStorage`, por lo que persisten entre sesiones sin necesidad de servidor ni base de datos externa.

## Funcionalidades

- Visualización de los 12 meses con indicador de notas (destacado/apagado)
- Contador de notas por mes
- Crear, editar y eliminar notas dentro de cada mes
- Listado global de todas las notas desde la página principal
- Limpiar todas las notas del calendario
- Persistencia de datos con `localStorage`

## Estructura del proyecto

```
PR01-Trim2---Gestor-Notas-en-Calendario/
├── index.html        
├── mes.html          
├── css/
│   └── styles.css    
├── js/
│   ├── storage.js    
│   ├── app_index.js  
│   └── app_mes.js
│── resource/
│   ├── logoIco.png
│   └── logoMain.png
└── README.md
```

## Instrucciones de uso

**Para añadir una nota:**

1. Selecciona el mes
2. Ponle un título
3. Describe tu nota
4. Dale a guardar nota


**Para volver:**

1. Dale arriba a la derecha a `volver al calendario`

**Para listar todas las notas:**
1. En el menu principal. Dale a listar todas las notas.

**Para limpiar el calendario:**
1. En el menu principal. Dale a limpiar el calendario.

## Tecnologías

- HTML
- CSS
- JavaScript (obvio)
- `localStorage` para persistencia de datos

