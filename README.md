# 🚀 Rock the Code v2 – Backend API

API REST desarrollada con Node.js, Express y MongoDB Atlas.

Implementa autenticación JWT, roles de usuario, subida de imágenes con Cloudinary y relaciones entre colecciones.

---

## 🛠️ Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Multer
- Cloudinary
- dotenv

---

## 📦 Modelos

### 👤 User

- username (único)
- email (único)
- password (encriptado)
- role (user | admin)
- image (Cloudinary)
- favorites (array de ObjectId referenciando Product)

---

### 📦 Product

- name
- price
- description
- category
- image (Cloudinary)

---

## 🔗 Relaciones

Un usuario puede tener múltiples productos favoritos.

- No se permiten duplicados.
- El sistema funciona como toggle.
- Al eliminar un producto se elimina de todos los favoritos.

---

## 🔐 Autenticación y Roles

- Registro → siempre crea role "user"
- Admin puede cambiar roles (toggle)
- User no puede cambiar su propio rol
- User solo puede borrar su cuenta
- Admin puede borrar cualquier usuario

---

## 📡 Endpoints

### 🔑 Auth

| Método | Endpoint | Permiso |
|--------|----------|----------|
| POST | /api/users/register | Público |
| POST | /api/users/login | Público |

---

### 👤 Users

| Método | Endpoint | Permiso |
|--------|----------|----------|
| GET | /api/users/me | User |
| PUT | /api/users/me | User |
| DELETE | /api/users/me | User |
| GET | /api/users | Admin |
| GET | /api/users/:id | Admin |
| DELETE | /api/users/:id | Admin |
| PUT | /api/users/:id/role | Admin |

---

### 📦 Products

| Método | Endpoint | Permiso |
|--------|----------|----------|
| GET | /api/products | Público |
| GET | /api/products/:id | Público |
| POST | /api/products | Admin |
| PUT | /api/products/:id | Admin |
| DELETE | /api/products/:id | Admin |

---

## ☁️ Cloudinary

- Subida mediante Multer memoryStorage
- No se guardan archivos temporales en disco
- Eliminación automática de imagen al borrar usuario o producto

---

## 🌱 Seed

Ejecutar:

---

## ⚙️ Variables de entorno


PORT=5000
MONGODB_URI=tu_uri_mongodb
JWT_SECRET=tu_secreto

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


---

## ▶️ Ejecución


npm install
npm run dev


Servidor:


http://localhost:5000


---

## ✅ Estado del Proyecto

✔ CRUD completo  
✔ Roles funcionales  
✔ Relaciones sin duplicados  
✔ Eliminación en cascada  
✔ Subida de imágenes  
✔ Seed incluida  
✔ Manejo global de errores  
✔ Arquitectura limpia  

---

## 🏁 Conclusión

Proyecto backend completo aplicando buenas prácticas, seguridad y arquitectura profesional.