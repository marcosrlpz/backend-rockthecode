# 🚀 Rock the Code v2 – Backend API

API REST desarrollada con Node.js, Express y MongoDB Atlas.

Implementa autenticación JWT, roles de usuario, subida de imágenes con Cloudinary y relaciones entre colecciones.

---

## 🛠️ Tecnologías

- Node.js
- Express
- MongoDB Atlas + Mongoose
- JWT
- bcryptjs
- Multer + Cloudinary
- dotenv

---

## 📦 Modelos

### 👤 User
| Campo | Tipo | Descripción |
|-------|------|-------------|
| username | String | Único, obligatorio |
| email | String | Único, obligatorio |
| password | String | Encriptado con bcrypt |
| role | String | "user" o "admin" |
| image | Object | url + public_id (Cloudinary) |
| favorites | [ObjectId] | Referencia a Product |

### 📦 Product
| Campo | Tipo | Descripción |
|-------|------|-------------|
| name | String | Obligatorio |
| price | Number | Obligatorio |
| description | String | Opcional |
| category | String | Opcional |
| image | Object | url + public_id (Cloudinary) |

---

## 🔗 Relaciones

Un usuario puede tener múltiples productos favoritos (array sin duplicados). Al eliminar un producto se elimina automáticamente de los favoritos de todos los usuarios.

---

## 🔐 Autenticación y Roles

- Registro → siempre crea role `"user"`
- El primer admin se crea manualmente desde MongoDB Atlas
- Admin puede cambiar el rol de cualquier usuario (toggle)
- Un usuario NO puede cambiar su propio rol
- Un usuario solo puede borrar su propia cuenta
- Admin puede borrar cualquier cuenta

---

## 📡 Endpoints

### 🔑 Auth
| Método | Endpoint | Permiso |
|--------|----------|---------|
| POST | /api/users/register | Público |
| POST | /api/users/login | Público |

### 👤 Users
| Método | Endpoint | Permiso |
|--------|----------|---------|
| GET | /api/users/me | User |
| PUT | /api/users/me | User |
| DELETE | /api/users/me | User |
| PUT | /api/users/favorites/:productId | User |
| GET | /api/users | Admin |
| GET | /api/users/:id | Admin |
| DELETE | /api/users/:id | Admin |
| PUT | /api/users/:id/role | Admin |

### 📦 Products
| Método | Endpoint | Permiso |
|--------|----------|---------|
| GET | /api/products | Público |
| GET | /api/products/:id | Público |
| POST | /api/products | Admin |
| PUT | /api/products/:id | Admin |
| DELETE | /api/products/:id | Admin |

---

## ☁️ Cloudinary

- Subida mediante Multer `memoryStorage` (sin archivos temporales en disco)
- Eliminación automática de imagen al borrar usuario o producto
- Al actualizar imagen de producto, se elimina la anterior automáticamente

---

## 🌱 Seed
```bash
node seeds/products.seed.js
```

---

## ⚙️ Variables de entorno
```env
PORT=5000
MONGODB_URI=tu_uri_mongodb
JWT_SECRET=tu_secreto
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

---

## ▶️ Instalación y ejecución
```bash
npm install
npm run dev
```

Servidor disponible en `http://localhost:5000`

---

## ✅ Checklist del proyecto

- ✔ 2 modelos (User + Product)
- ✔ Dato relacionado (favorites)
- ✔ Roles con middleware Auth
- ✔ Subida y eliminación de imágenes con Cloudinary
- ✔ Sin duplicados en el array de favoritos
- ✔ CRUD completo de ambas colecciones
- ✔ Seed para productos
- ✔ README documentado
- ✔ Manejo global de errores