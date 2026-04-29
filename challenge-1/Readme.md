# Challenge 1 — Product Inventory API

A RESTful API built with Node.js, Express, MongoDB, and JWT authentication.

---

## Folder Structure

```
├── config/
│   └── DB.js                     # MongoDB connection
├── controllers/
│   ├── auth.controller.js        # Register, login logic
│   └── product.controller.js     # CRUD logic for products
├── middlewares/
│   ├── auth.middleware.js        # JWT verification
│   ├── role.middleware.js        # Role-based authorization
│   └── validate.middleware.js    # Express Validator error handler
├── models/
│   ├── auth.model.js             # User schema
│   └── product.model.js          # Product schema
├── routes/
│   ├── auth.routes.js            # /api/auth
│   └── product.routes.js         # /api/products
├── .env
├── index.js                      # Entry point
└── package.json
```

---

## Packages

| Package | Purpose |
|---|---|
| `express` | Web framework |
| `mongoose` | MongoDB ODM |
| `jsonwebtoken` | JWT sign and verify |
| `bcrypt` | Password hashing |
| `express-validator` | Input validation |
| `dotenv` | Environment variables |

---

## Setup

**1. Clone the repo and install dependencies**
```bash
npm install
```

**2. Create a `.env` file in the root**
```env
DB_URL=mongodb://localhost:27017/product-inventory
JWT_SECRET=your_secret_key
```

**3. Start the server**
```bash
node index.js
```

Server runs on `http://localhost:3000`

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and get JWT token |

### Products
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/products` | User | List products (10 per page) |
| GET | `/api/products/:id` | User | Get single product |
| POST | `/api/products` | Admin | Add a product |
| PUT | `/api/products/:id` | Admin | Update a product |
| DELETE | `/api/products/:id` | Admin | Delete a product |

Pagination: `GET /api/products?page=2`

---

## Authentication

Include the JWT token in the `Authorization` header for all protected routes:
```
Authorization: Bearer <token>
```
