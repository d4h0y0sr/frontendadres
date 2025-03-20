# Adres

Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.3.

## Servidor de desarrollo

### Instalación de dependencias

Antes de iniciar el servidor de desarrollo, instalar las dependencias del proyecto.

```bash
npm install
```

### Iniciar el servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecutar:

```bash
ng serve
```
Una vez que el servidor esté en funcionamiento, abrir el navegador en `http://localhost:4200/`.


## Construcción

Para construir el proyecto, ejecutar:

```bash
ng build
```


## Configuración del Proxy

Para modificar la configuración del proxy según el puerto donde esté el backend, editar el archivo `src/proxy.conf.json`. Por ejemplo, si el backend está en el puerto 3000, cambiar la configuración a:

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}
```
