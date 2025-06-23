# 📰 Foro personal - Admin Panel + Frontend

Este es un proyecto de foro de publicaciones donde los usuarios pueden ver artículos y los administradores pueden crearlos, editarlos u ocultarlos mediante un panel de administración elegante, funcional y con previsualización de imagen en tiempo real.

## 📌 Descripción del Proyecto

El sistema está dividido en **cuatro interfaces principales**:

- **🏠 HomePage**: donde se listan las publicaciones con filtros y tarjetas responsivas.
- **🔐 Login**: página de autenticación para acceder al panel administrativo.
- **👑 Panel de Administración**: permite crear, editar y gestionar los posts, con funciones como:
  - Carga y previsualización de imágenes desde URL.
  - Edición inline desde una tabla con `ag-grid`.
  - Uso de modales para creación y edición de contenido.
  - Protección con token de sesión.
  - Visualización de estado de los artículos.
- **📖 PostDetail**: vista detallada de cada artículo con información completa del autor.

## 🛠️ Lenguajes y herramientas utilizadas

- **Frontend**:  
  - `Vue 3` + `Options API` (convertido desde Composition API)
  - `Vite` como entorno de desarrollo
  - `Bootstrap 5` para diseño responsive
  - `Bootstrap Icons` para iconografía
  - `ag-grid-vue3` para la tabla dinámica
  - `Axios` para peticiones HTTP
  - `SweetAlert2` para modales y confirmaciones
  - `Vue Router 4` para navegación SPA

- **Backend API** (ya implementado):
  - `.NET 8` (ASP.NET Web API)
  - Base de datos `MySQL`
  - `JWT Authentication` para seguridad
  - Endpoints REST para:
    - `GET /article/get-articles` - Obtener todos los artículos
    - `GET /article/get-articles-by-user` - Artículos por usuario autenticado
    - `POST /article/register` - Crear nuevo artículo
    - `PUT /article/update-article/:id` - Actualizar artículo
    - `POST /auth/login` - Autenticación de usuarios

## 🚀 Funcionalidades Principales

### 🏠 **Página Principal (Home)**
- ✅ Visualización de artículos en tarjetas responsivas
- ✅ Sistema de búsqueda en tiempo real (título, introducción, autor)
- ✅ Ordenamiento automático por fecha (más recientes primero)
- ✅ Estados de carga y error
- ✅ Navegación fluida a detalles del post

### 🔐 **Sistema de Autenticación**
- ✅ Login seguro con JWT tokens
- ✅ Protección de rutas administrativas
- ✅ Manejo de sesiones con `sessionStorage`
- ✅ Redirección automática según permisos

### 👑 **Panel de Administración**
- ✅ Tabla dinámica con `AG-Grid` para gestión masiva
- ✅ CRUD completo (Crear, Leer, Actualizar)
- ✅ Formularios con validación en tiempo real
- ✅ Previsualización de imágenes desde URL
- ✅ Limite de caracteres en introducción (150 max)
- ✅ Modales responsivos para edición
- ✅ Filtrado y búsqueda rápida

### 📖 **Vista de Detalle**
- ✅ Información completa del artículo
- ✅ Datos del autor con diseño elegante
- ✅ Navegación de regreso fluida
- ✅ Manejo de datos mediante `sessionStorage`

## 🚀 Instrucciones de uso y despliegue

### 📦 Clonación e instalación

```bash
git clone https://github.com/AlexCen29/blog-noticas2
cd blog-noticas2
npm install
```

### 🔧 Variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://digitalpen.onrender.com/api/auth/
VITE_API_ART=https://digitalpen.onrender.com/api/
```

### 🖥️ Ejecutar en desarrollo

```bash
npm run dev
```

### 📱 Abrir en navegador
Visitar: `http://localhost:5173`

## 🚀 Demo en Vivo

🔗 **[Ver Demo](https://alexcen29.github.io/blog-noticas2/)**
