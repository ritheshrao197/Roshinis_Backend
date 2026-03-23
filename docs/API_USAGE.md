# Roshinis Backend API Guide

This document explains how to run and consume the APIs currently available in this backend.

## Project Summary

This Express + MongoDB backend is organized by ecommerce domains:

- Authentication
- Products
- Categories
- Coupons
- Wishlist
- Reviews
- Shipping
- Orders
- Payments
- Analytics / Admin
- Notifications
- Invoices

The codebase already contains most of these modules, but not all of them are fully exposed through the running app yet. This guide separates:

- `Implemented and mounted`: available through the current server
- `Implemented but not mounted`: code exists, but the route is not currently attached in `src/app.js`
- `Planned / missing`: mentioned in the design, but not implemented yet

## Runtime Setup

### Install dependencies

```bash
npm install
```

### Environment variables

The project uses `.env` values like:

```env
PORT=5000
MONGO_URI=...
JWT_SECRET=...
RAZORPAY_KEY=...
RAZORPAY_SECRET=...
PHONEPE_MERCHANT_ID=...
PHONEPE_SALT_KEY=...
PHONEPE_SALT_INDEX=1
PHONEPE_BASE_URL=https://api.phonepe.com/apis/hermes
FRONTEND_URL=http://localhost:5173
EMAIL_USER=...
EMAIL_PASS=...
```

### Start the server

```bash
npm run dev
```

Default local base URL:

```text
http://localhost:5000
```

Deployed base URL:

```text
https://roshinis-backend.onrender.com
```

## Current Backend Status

### Implemented and mounted now

These routes are attached in `src/app.js` and available when the server starts, both locally and on the deployed app:

- `/api/products`
- `/api/categories`
- `/api/coupons`
- `/api/wishlist`
- `/api/reviews`
- `/api/shipping`
- `/api/analytics`

### Implemented but not mounted yet

These route files exist, but they are not currently attached in `src/app.js`:

- `/api/auth`
- `/api/orders`
- `/api/payments`
- `/api/admin`

To use them, the app must mount their route modules first.

### Planned or partially implemented

These are not fully available yet:

- Product details by ID
- Product update / delete
- Category update / delete
- Coupon list / create
- Wishlist remove
- Review list by product
- Order details by ID
- Order status update
- Notifications APIs
- Invoice APIs
- Auth profile get / update

## Authentication APIs

Base route:

```text
/api/auth
```

Status: `Implemented but not mounted`

### `POST /api/auth/register`

Create a new user.

Request body:

```json
{
  "name": "Rohini",
  "email": "user@test.com",
  "password": "123456"
}
```

Response:

```json
{
  "user": {
    "_id": "65f...",
    "name": "Rohini",
    "email": "user@test.com",
    "password": "$2a$10$...",
    "role": "user",
    "createdAt": "2026-03-23T00:00:00.000Z",
    "__v": 0
  },
  "token": "jwt-token"
}
```

Notes:

- Password is hashed before saving.
- The current response returns the saved user document, including the hashed password.

### `POST /api/auth/login`

Login with email and password.

Request body:

```json
{
  "email": "user@test.com",
  "password": "123456"
}
```

Possible responses:

```json
{
  "user": {
    "_id": "65f...",
    "name": "Rohini",
    "email": "user@test.com",
    "password": "$2a$10$...",
    "role": "user",
    "createdAt": "2026-03-23T00:00:00.000Z",
    "__v": 0
  },
  "token": "jwt-token"
}
```

```json
{
  "message": "User not found"
}
```

```json
{
  "message": "Invalid password"
}
```

Not implemented yet:

- `GET /api/auth/profile`
- `PUT /api/auth/profile`

## Product APIs

Base route:

```text
/api/products
```

Status: `Implemented and mounted`

### `GET /api/products`

Get all products.

Example response:

```json
[
  {
    "_id": "65f...",
    "name": "Roshini Nutrimix",
    "description": "Multi grain nutrition mix",
    "price": 250,
    "category": "Health Mix",
    "stock": 200,
    "reviews": [],
    "createdAt": "2026-03-23T00:00:00.000Z",
    "__v": 0
  }
]
```

### `GET /api/products/search?q=nutrimix`

Search products using MongoDB text index on `name` and `description`.

Example:

```http
GET /api/products/search?q=nutrimix
```

### `POST /api/products`

Create a product.

Request body:

```json
{
  "name": "Roshini Nutrimix",
  "description": "Multi grain nutrition mix",
  "price": 250,
  "category": "Health Mix",
  "stock": 200
}
```

Not implemented yet:

- `GET /api/products/:id`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

## Category APIs

Base route:

```text
/api/categories
```

Status: `Implemented and mounted`

### `GET /api/categories`

Get all categories.

Example seeded categories:

- Health Mix
- Seeds
- Millets
- Soaps
- Healthy Snacks

### `POST /api/categories`

Create a category.

Request body:

```json
{
  "name": "Healthy Snacks",
  "description": "Healthy snacks and bars"
}
```

Not implemented yet:

- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`

## Coupon APIs

Base route:

```text
/api/coupons
```

Status: `Implemented and mounted`

### `POST /api/coupons/apply`

Apply a coupon to a cart total.

Request body:

```json
{
  "code": "WELCOME10",
  "total": 500
}
```

Example responses:

```json
{
  "valid": true,
  "discount": 10,
  "newTotal": 490
}
```

```json
{
  "valid": false
}
```

Important behavior:

- The current controller only checks whether the coupon code exists.
- It uses `discountValue` directly.
- `discountType`, `expiryDate`, and `active` are currently not validated in the apply flow.

Not implemented yet:

- `GET /api/coupons`
- `POST /api/coupons` for admin coupon creation

## Wishlist APIs

Base route:

```text
/api/wishlist
```

Status: `Implemented and mounted`

### `GET /api/wishlist?userId=123`

Get one user's wishlist by `userId`.

### `POST /api/wishlist/add`

Add a product to the user's wishlist.

Request body:

```json
{
  "userId": "123",
  "productId": "456"
}
```

Behavior:

- If no wishlist exists for the user, one is created.
- If a wishlist exists, the product is appended.
- Duplicate product entries are currently possible.

Not implemented yet:

- `DELETE /api/wishlist/remove`

## Review APIs

Base route:

```text
/api/reviews
```

Status: `Implemented and mounted`

### `POST /api/reviews`

Add a review to a product.

Request body:

```json
{
  "productId": "123",
  "userId": "456",
  "rating": 5,
  "comment": "Very good product"
}
```

Behavior:

- Reviews are stored inside the product document.
- The API returns the updated product object.

Not implemented yet:

- `GET /api/reviews/:productId`

## Shipping APIs

Base route:

```text
/api/shipping
```

Status: `Implemented and mounted`

### `POST /api/shipping/calculate`

Calculate shipping cost.

Request body:

```json
{
  "weight": 1.5,
  "pincode": "575001"
}
```

Example response:

```json
{
  "shippingCost": 90
}
```

Current calculation logic:

- Base cost = `50`
- If `weight > 2`, add `30`
- If the pincode does not start with `56`, add `40`

## Order APIs

Base route:

```text
/api/orders
```

Status: `Implemented but not mounted`

### `POST /api/orders`

Create an order.

Request body example:

```json
{
  "userId": "123",
  "items": [
    {
      "productId": "456",
      "quantity": 2,
      "price": 250
    }
  ],
  "totalAmount": 500,
  "paymentMethod": "COD",
  "paymentStatus": "Pending"
}
```

Behavior:

- The backend creates an `orderId` in the format `ORD-<uuid>`.
- `orderStatus` defaults to `Pending`.

### `GET /api/orders`

List all orders.

Not implemented yet:

- `GET /api/orders/:id`
- `PUT /api/orders/:id/status`

## Payment APIs

Base route:

```text
/api/payments
```

Status: `Implemented but not mounted`

### `POST /api/payments/phonepe`

Create a PhonePe payment request.

Request body:

```json
{
  "orderId": "ORD123",
  "amount": 499
}
```

### `POST /api/payments/razorpay`

Create a Razorpay order.

Request body:

```json
{
  "amount": 499
}
```

### `POST /api/payments/cod`

Create a Cash on Delivery flow response.

Response:

```json
{
  "message": "Order placed with Cash on Delivery"
}
```

Notes:

- Payment APIs depend on environment variables being set correctly.
- The code imports `razorpay`, but that package is not currently listed in `package.json`.

## Analytics and Admin APIs

### Analytics

Base route:

```text
/api/analytics
```

Status: `Implemented and mounted`

#### `GET /api/analytics/dashboard`

Current response:

```json
{
  "totalProducts": 120
}
```

This endpoint currently returns only the product count.

### Admin

Base route:

```text
/api/admin
```

Status: `Implemented but not mounted`

#### `GET /api/admin/dashboard`

Current response shape:

```json
{
  "products": 120,
  "orders": 34,
  "users": 200,
  "revenue": 18500
}
```

Not implemented yet:

- `GET /api/admin/orders`
- `GET /api/admin/products`

## Notification APIs

Status: `Planned / service-only`

Current status:

- There is an email service in `src/services/emailService.js`
- No notification route/controller is exposed yet
- WhatsApp messaging is not implemented

Planned routes:

- `POST /api/notifications/email`
- `POST /api/notifications/whatsapp`

## Invoice APIs

Status: `Planned / service-only`

Current status:

- There is an invoice PDF generator in `src/services/invoiceService.js`
- No invoice route/controller is exposed yet

Planned route:

- `GET /api/invoice/:orderId`

## Recommended Frontend Integration Order

If you are integrating the frontend today, use this order:

1. Products
2. Categories
3. Coupons
4. Wishlist
5. Reviews
6. Shipping
7. Analytics

Then enable these in backend routing before frontend integration:

1. Auth
2. Orders
3. Payments
4. Admin

## Example cURL Requests

### Get all products

```bash
curl https://roshinis-backend.onrender.com/api/products
```

### Search products

```bash
curl "https://roshinis-backend.onrender.com/api/products/search?q=seeds"
```

### Create category

```bash
curl -X POST https://roshinis-backend.onrender.com/api/categories \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Healthy Snacks\",\"description\":\"Healthy snacks and bars\"}"
```

### Apply coupon

```bash
curl -X POST https://roshinis-backend.onrender.com/api/coupons/apply \
  -H "Content-Type: application/json" \
  -d "{\"code\":\"WELCOME10\",\"total\":500}"
```

### Add wishlist item

```bash
curl -X POST https://roshinis-backend.onrender.com/api/wishlist/add \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"123\",\"productId\":\"456\"}"
```

### Add review

```bash
curl -X POST https://roshinis-backend.onrender.com/api/reviews \
  -H "Content-Type: application/json" \
  -d "{\"productId\":\"123\",\"userId\":\"456\",\"rating\":5,\"comment\":\"Very good product\"}"
```

### Calculate shipping

```bash
curl -X POST https://roshinis-backend.onrender.com/api/shipping/calculate \
  -H "Content-Type: application/json" \
  -d "{\"weight\":1.5,\"pincode\":\"575001\"}"
```

## Gaps Between Design and Current Code

Your proposed ecommerce API structure is strong and production-friendly, but the current codebase is still in a partial implementation stage.

Main gaps:

- Several route modules are not mounted in `src/app.js`
- CRUD coverage is incomplete in products and categories
- Some modules only implement create flows, not read/update/delete flows
- Notifications and invoices exist only as services
- There is no auth middleware protecting private routes yet
- Error handling and validation are minimal

## Suggested Next Improvements

1. Mount auth, orders, payments, and admin routes in `src/app.js`
2. Add request validation and centralized error handling
3. Hide hashed passwords from auth responses
4. Add auth middleware for protected routes
5. Complete missing CRUD endpoints
6. Expose notifications and invoice controllers/routes
7. Add API documentation tooling such as Swagger later


