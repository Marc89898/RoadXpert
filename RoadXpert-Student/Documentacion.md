# Puesta en Marcha del Proyecto

### Acceso a la Carpeta
```bash
cd ROADXPERT
```

### Activación de npm
```bash
npm install
```

### Activación de npm
```bash
npm run
```

### Inicialización del Proyecto
```bash
npm start
```

### Escaneo del Código QR
Escanea el código QR utilizando la aplicación móvil Expo Go.

# Organización de Pantallas y Recursos

## Pantallas
Las distintas disposiciones de pantalla se encuentran en el directorio `./Components/...`.

## Recursos Gráficos
Las imágenes se ubican en `./assets/images/` y están organizadas en carpetas correspondientes a las diferentes disposiciones de pantalla.

## Importación de Componentes Navegacionales
Puedes importar componentes como `NavBar` (Barra de Navegación) o `BackNavigation` (Botón de Retroceso) en los diseños, utilizando la ruta correspondiente.

En el código, simplemente añade `<BackNavigation />` o `<NavBar />` según sea necesario.

## Modificaciones en App.js
Después de crear un nuevo diseño, asegúrate de importarlo en el archivo `App.js`.

Utiliza el componente `StackNavigation` para definir qué diseño se mostrará al iniciar la aplicación. Por ejemplo, puedes establecer el diseño inicial con `initialRouteName="SplashScreen"`.

**IMPORTANTE⚠️:** Cuando se importa un diseño (layout) en el archivo `App.js`, es necesario guardar los cambios presionando `Ctrl+S`. Si no se hace esto, pueden surgir errores.