# Guía de Configuración y Desarrollo - Almacén Offline PWA

## Requisitos Previos
- Node.js (versión 18 o superior)
- npm o yarn
- Git

## Configuración Inicial
1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd almacen-offline
```

2. Instalar dependencias:
```bash
npm install
```

## Estructura del Proyecto
```
almacen-offline/
├── src/
│   ├── pages/         # Páginas de la aplicación
│   ├── components/    # Componentes reutilizables
│   ├── layout/        # Componentes de diseño
│   └── assets/        # Recursos estáticos
├── public/
│   ├── sw.js         # Service Worker
│   └── icons/        # Iconos PWA
```

## Scripts Disponibles
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run serve` - Sirve la versión de producción localmente
- `npm run test-build` - Construye y prueba la versión de producción
- `npm run clean` - Limpia la carpeta de distribución

## Desarrollo Local
1. Iniciar el servidor de desarrollo:
```bash
npm run dev
```
2. Abrir http://localhost:5173 en el navegador

## Pruebas de PWA
1. Construir la aplicación:
```bash
npm run test-build
```
2. Abrir http://localhost:4173
3. Verificar:
   - Funcionalidad offline
   - Instalación como PWA
   - Caché de recursos

## Consideraciones Importantes
- El Service Worker (sw.js) maneja el caché y la funcionalidad offline
- Los iconos PWA deben estar en la carpeta public/ con los nombres:
  - pwa-192x192.png
  - pwa-512x512.png
- La configuración PWA está en vite.config.ts
- El archivo .env contiene las variables de entorno

## Despliegue
1. Construir la aplicación:
```bash
npm run build
```
2. Los archivos de distribución estarán en la carpeta `dist/`

## Solución de Problemas
- Si el Service Worker no se registra, verificar la consola del navegador
- Para desarrollo, desactivar el Service Worker en las DevTools
- Limpiar el caché con `npm run clean` si hay problemas de construcción

## Recursos Adicionales
- [Documentación de Vite](https://vitejs.dev/)
- [PWA con Vite](https://vite-pwa-org.netlify.app/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
