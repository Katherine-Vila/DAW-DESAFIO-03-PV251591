# Desafío 03 - Desarrollo de Aplicaciones Web (DAW404)

Este repositorio contiene la solución completa al "Desafío 03" de la materia Desarrollo de Aplicaciones Web con Software Interpretado en el Cliente (DAW404) de la Universidad Don Bosco. El proyecto está dividido en cuatro ejercicios progresivos que abarcan diferentes tecnologías frontend, desde Vanilla JavaScript hasta frameworks modernos como Angular y React.

## Estructura del Repositorio

El repositorio está organizado en cuatro directorios principales, correspondientes a cada ejercicio solicitado:

### Ejercicio 01: Manejo de Web Storage y Elementos Multimedia
Aplicación web diseñada para demostrar el uso persistente y de sesión de datos en el navegador.
- **Tecnologías:** HTML5, CSS3, Vanilla JavaScript.
- **Funciones Principales:** 
  - Manejo de objetos de audio (API de HTML5).
  - Implementación de `localStorage` para persistencia de datos a largo plazo.
  - Implementación de `sessionStorage` para datos temporales.
  - Interfaz responsiva y estructurada.

### Ejercicio 02: CRUD de Empleados con JSON
Gestor de registros de empleados simulando una base de datos a través de peticiones asíncronas y manipulación del DOM.
- **Tecnologías:** HTML5, Bootstrap 5, JavaScript Asíncrono (AJAX/Fetch).
- **Funciones Principales:** 
  - Consumo de un archivo JSON (`recursos/empleados.json`) mediante `XMLHttpRequest` (y/o Fetch).
  - Operaciones CRUD completas (Crear, Leer, Actualizar, Borrar).
  - Validaciones de formularios (ej. patrón de número telefónico salvadoreño).
  - Renderizado dinámico de tablas en el cliente.

### Ejercicio 03: Aplicación To-Do (Lista de Tareas) en Angular
Plataforma completa para la gestión de tareas diarias, desarrollada bajo la arquitectura de componentes de Angular.
- **Tecnologías:** Angular 16, TypeScript, Bootstrap 5.
- **Funciones Principales:**
  - Estructura basada en componentes y servicios.
  - Creación de tareas con niveles de prioridad.
  - Sistema de paginación integrado para manejar listas extensas.
  - Edición y eliminación de registros (CRUD).
- **Instalación:** Navegar al directorio `Ejercicio03/to-do-app`, ejecutar `npm install` y posteriormente `npm start`.

### Ejercicio 04: Cotizador de Agencia de Viajes en React
Aplicación interactiva que calcula en tiempo real el costo total de un paquete vacacional basado en selección dinámica de parámetros.
- **Tecnologías:** React, Next.js 15, Bootstrap 5.
- **Funciones Principales:**
  - Uso de Hooks de React (`useState`) para el manejo del estado de la aplicación.
  - Cálculos matemáticos en tiempo real dependientes de múltiples variables (cantidad de adultos, niños, hotel, restaurante y tipo de vuelo).
  - Renderizado condicional para la confirmación del paquete.
- **Instalación:** Navegar al directorio `Ejercicio04/app-reserva`, ejecutar `npm install` y posteriormente `npm run dev`.

## Requisitos Previos

Para ejecutar los Ejercicios 03 y 04 de manera local, es necesario contar con:
- **Node.js** (versión 18 o superior recomendada).
- **NPM** (Node Package Manager).

## Autor
- Katherine Alexandra Pinto Vila 
