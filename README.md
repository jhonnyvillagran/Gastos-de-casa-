# Gestor de Gastos Pro

Esta es una aplicación web para la gestión de finanzas personales que se sincroniza con Google Sheets.

## Despliegue

1.  **Backend (Google Apps Script):** El código se encuentra en el archivo `Code.gs`. Debe ser desplegado como una Aplicación Web con acceso para "Cualquier persona".
2.  **Frontend (GitHub Pages):** Sube los archivos `index.html` y `manifest.json` a un repositorio de GitHub y activa GitHub Pages en la rama principal.

## Configuración

La URL de la aplicación web de Google Apps Script debe ser pegada en el archivo `index.html` dentro del objeto `CONFIG`.