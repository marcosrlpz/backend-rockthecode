# 🚀 Rock the Code v2 – Backend API

API REST desarrollada con Node.js y Express, conectada a MongoDB Atlas, que implementa autenticación con JWT, roles de usuario, subida de imágenes con Cloudinary y relaciones entre colecciones.

---

## 🧠 Objetivo del proyecto

El objetivo de este proyecto es desarrollar un backend completo aplicando los conocimientos adquiridos en el módulo de Backend.

Funcionalidades principales:
- Autenticación mediante JWT
- Gestión de roles (user y admin)
- CRUD completo de todas las colecciones
- Relación entre colecciones sin duplicados
- Subida y eliminación de imágenes con Cloudinary
- Seed para inicializar datos
- Código estructurado y documentado

---

## 🛠️ Tecnologías utilizadas

Node.js  
Express  
MongoDB Atlas  
Mongoose  
jsonwebtoken  
bcryptjs  
Multer  
Cloudinary  
dotenv  
nodemon  

---

## 📦 Modelos

### User
Campos:
- username (único)
- email (único)
- password (encriptado)
- role: user | admin
- image (Cloudinary)
- favorites (relación con Product sin duplicados)

---

### Product
Campos:
- name
- price
- description
- category
- image (Cloudinary)

---

## 🔗 Relaciones

- Un usuario puede tener productos favoritos
- Relación mediante ObjectId
- No se permiten duplicados
- El sistema de favoritos funciona como toggle

---

## 🔐 Autenticación y roles

- Autenticación mediante JWT
- Middleware para proteger rutas
- Middleware exclusivo para administradores

Permisos:

Registro: User ✅ | Admin ❌  
Login: User ✅ | Admin ✅  
Ver perfil: User ✅ | Admin ✅  
Borrar su cuenta: User ✅ | Admin ✅  
Borrar otras cuentas: User ❌ | Admin ✅  
Cambiar roles: User ❌ | Admin ✅  
Crear productos: User ❌ | Admin ✅  
Eliminar productos: User ❌ | Admin ✅  

---

## ☁️ Gestión de imágenes (Cloudinary)

- Subida de imágenes mediante Multer
- Almacenamiento en Cloudinary
- Eliminación automática de la imagen al borrar el usuario o producto

---

## 🌱 Seed de datos

El proyecto incluye una seed para la colección de productos.
Comando de ejecución:
node seeds/products.seed.js

---

## 📡 Endpoints

Users:
- POST /api/users/register
- POST /api/users/login
- GET /api/users/me
- DELETE /api/users/:id
- PUT /api/users/:id/role

Products:
- GET /api/products
- POST /api/products
- DELETE /api/products/:id
- POST /api/products/:id/favorite

---

## ⚙️ Variables de entorno

PORT=5000  
MONGODB_URI=tu_uri_mongodb  
JWT_SECRET=tu_secreto_jwt  

CLOUDINARY_CLOUD_NAME=xxxx  
CLOUDINARY_API_KEY=xxxx  
CLOUDINARY_API_SECRET=xxxx  

---

## ▶️ Instalación y ejecución

npm install  
npm run dev  

Servidor disponible en:
http://localhost:5000

---

## ✅ Estado del proyecto

✔ Autenticación con JWT  
✔ Roles y permisos  
✔ CRUD completo  
✔ Relaciones sin duplicados  
✔ Subida de imágenes  
✔ Seed incluida  
✔ Documentación completa  

---

## 🏁 Conclusión

Este proyecto cumple todos los requisitos del módulo Backend con Node.js, aplicando buenas prácticas, seguridad y una arquitectura clara.
