# Roshinis Backend API Guide

This guide documents the APIs currently implemented in the backend and how to use them from the frontend or external clients.

It reflects the route surface mounted in `src/app.js`.

## Base URLs

Local:

```text
http://localhost:5000
```

Deployed:

```text
https://roshinis-backend.onrender.com
```

Base API prefix:

```text
/api
```

## Setup

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Important environment variables:

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

## Current API Modules

Mounted and available now:

- `/api/auth`
- `/api/products`
- `/api/categories`
- `/api/coupons`
- `/api/wishlist`
- `/api/reviews`
- `/api/shipping`
- `/api/orders`
- `/api/payments`
- `/api/analytics`
- `/api/admin`
- `/api/users`

Still not exposed as routes:

- Notifications APIs
- Invoice APIs

## Implemented Endpoint Summary

These endpoints are currently implemented and mounted:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`
- `GET /api/products`
- `GET /api/products/search?q=:query`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/categories`
- `POST /api/categories`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`
- `POST /api/coupons/apply`
- `GET /api/wishlist?userId=:userId`
- `POST /api/wishlist/add`
- `DELETE /api/wishlist/remove`
- `GET /api/reviews/:productId`
- `POST /api/reviews`
- `POST /api/shipping/calculate`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id/status`
- `POST /api/payments/cod`
- `POST /api/payments/razorpay`
- `POST /api/payments/phonepe`
- `GET /api/analytics/dashboard`
- `GET /api/admin/dashboard`
- `GET /api/admin/users`
- `GET /api/admin/users/:id`
- `GET /api/users`
- `GET /api/users/:id`

## Authentication APIs

Base route:

```text
/api/auth
```

### `POST /api/auth/register`

Create a new user.

Request:

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
    "role": "user",
    "createdAt": "2026-03-23T00:00:00.000Z",
    "__v": 0
  },
  "token": "jwt-token"
}
```

Notes:

- Returns `201 Created`
- Rejects duplicate emails
- Password is hashed and is not returned in the response

### `POST /api/auth/login`

Request:

```json
{
  "email": "user@test.com",
  "password": "123456"
}
```

Success response:

```json
{
  "user": {
    "_id": "65f...",
    "name": "Rohini",
    "email": "user@test.com",
    "role": "user"
  },
  "token": "jwt-token"
}
```

Error responses:

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

### `GET /api/auth/profile`

Get the logged-in user profile.

Header:

```text
Authorization: Bearer <jwt-token>
```

Response:

```json
{
  "user": {
    "_id": "65f...",
    "name": "Rohini",
    "email": "user@test.com",
    "role": "user"
  }
}
```

### `PUT /api/auth/profile`

Update the logged-in user profile.

Header:

```text
Authorization: Bearer <jwt-token>
```

Request:

```json
{
  "name": "Rohini S",
  "email": "newmail@test.com",
  "password": "newpassword"
}
```

Response:

```json
{
  "user": {
    "_id": "65f...",
    "name": "Rohini S",
    "email": "newmail@test.com",
    "role": "user"
  }
}
```

## Product APIs

Base route:

```text
/api/products
```

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
    "image": "https://...",
    "reviews": [],
    "createdAt": "2026-03-23T00:00:00.000Z",
    "updatedAt": "2026-03-23T00:00:00.000Z",
    "__v": 0
  }
]
```

### `GET /api/products/:id`

Get one product by MongoDB `_id`.

404 response:

```json
{
  "message": "Product not found"
}
```

### `GET /api/products/search?q=nutrimix`

Search products using MongoDB text search on `name` and `description`.

### `POST /api/products`

Create a product.

Request:

```json
{
  "name": "Roshini Nutrimix",
  "description": "Multi grain nutrition mix",
  "price": 250,
  "category": "Health Mix",
  "stock": 200,
  "image": "https://..."
}
```

Returns `201 Created`.

### `PUT /api/products/:id`

Update a product.

Request:

```json
{
  "name": "Updated name",
  "description": "Updated description",
  "price": 300,
  "category": "Seeds",
  "stock": 120,
  "image": "https://..."
}
```

### `DELETE /api/products/:id`

Delete a product.

Success response:

```json
{
  "message": "Product deleted successfully"
}
```

## Category APIs

Base route:

```text
/api/categories
```

### `GET /api/categories`

List categories.

Example seeded categories:

- Health Mix
- Seeds
- Millets
- Soaps
- Healthy Snacks

### `POST /api/categories`

Create a category.

```json
{
  "name": "Healthy Snacks",
  "description": "Healthy snacks and bars"
}
```

### `PUT /api/categories/:id`

Update a category.

### `DELETE /api/categories/:id`

Delete a category.

Success response:

```json
{
  "message": "Category deleted successfully"
}
```

## Coupon APIs

Base route:

```text
/api/coupons
```

### `POST /api/coupons/apply`

Request:

```json
{
  "code": "WELCOME10",
  "total": 500
}
```

Responses:

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

Current behavior:

- Looks up the coupon by code
- Uses `discountValue` directly
- Does not currently validate expiry or active status

## Wishlist APIs

Base route:

```text
/api/wishlist
```

### `GET /api/wishlist?userId=123`

Get a user's wishlist.

### `POST /api/wishlist/add`

Request:

```json
{
  "userId": "123",
  "productId": "456"
}
```

Notes:

- Creates the wishlist if it does not exist
- Duplicate product entries are currently possible

### `DELETE /api/wishlist/remove`

Request body or query params may be used:

```json
{
  "userId": "123",
  "productId": "456"
}
```

Validation error:

```json
{
  "message": "userId and productId are required"
}
```

## Review APIs

Base route:

```text
/api/reviews
```

### `GET /api/reviews/:productId`

Get all reviews for a product.

Response:

```json
[
  {
    "userId": "456",
    "rating": 5,
    "comment": "Very good product"
  }
]
```

### `POST /api/reviews`

Request:

```json
{
  "productId": "123",
  "userId": "456",
  "rating": 5,
  "comment": "Very good product"
}
```

Behavior:

- Reviews are stored inside the product document
- Returns the updated product

## Shipping APIs

Base route:

```text
/api/shipping
```

### `POST /api/shipping/calculate`

Request:

```json
{
  "weight": 1.5,
  "pincode": "575001"
}
```

Response:

```json
{
  "shippingCost": 90
}
```

Current logic:

- Base cost = `50`
- If `weight > 2`, add `30`
- If pincode does not start with `56`, add `40`

## Order APIs

Base route:

```text
/api/orders
```

### `POST /api/orders`

Create an order.

Request:

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

Notes:

- Returns `201 Created`
- Generates an `orderId` in the format `ORD-<uuid>`
- `orderStatus` defaults to `Pending`

### `GET /api/orders`

List all orders.

### `GET /api/orders/:id`

Get an order by MongoDB `_id` or by generated `ORD-...` order ID.

404 response:

```json
{
  "message": "Order not found"
}
```

### `PUT /api/orders/:id/status`

Update order status.

Request:

```json
{
  "orderStatus": "Shipped"
}
```

You can also send:

```json
{
  "status": "Shipped"
}
```

## Payment APIs

Base route:

```text
/api/payments
```

### `POST /api/payments/phonepe`

Request:

```json
{
  "orderId": "ORD123",
  "amount": 499
}
```

If the gateway call fails, the API returns:

```json
{
  "message": "PhonePe payment failed"
}
```

or the underlying service error message.

### `POST /api/payments/razorpay`

Request:

```json
{
  "amount": 499
}
```

If setup is incomplete, possible errors include:

```json
{
  "message": "Razorpay SDK is not installed on the backend"
}
```

```json
{
  "message": "Razorpay environment variables are missing"
}
```

### `POST /api/payments/cod`

Response:

```json
{
  "message": "Order placed with Cash on Delivery"
}
```

## Analytics APIs

Base route:

```text
/api/analytics
```

### `GET /api/analytics/dashboard`

Response:

```json
{
  "totalProducts": 120,
  "totalOrders": 34,
  "totalUsers": 200,
  "totalRevenue": 18500,
  "inStockProducts": 98
}
```

## Admin APIs

Base route:

```text
/api/admin
```

### `GET /api/admin/dashboard`

Response:

```json
{
  "products": 120,
  "orders": 34,
  "users": 200,
  "revenue": 18500
}
```

### `GET /api/admin/users`

List users for admin screens.

Response shape:

```json
[
  {
    "_id": "65f...",
    "username": "johndoe",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-03-23T00:00:00.000Z"
  }
]
```

### `GET /api/admin/users/:id`

Get one user by ID.

404 response:

```json
{
  "message": "User not found"
}
```

### `GET /api/users`

Alias for `GET /api/admin/users`.

### `GET /api/users/:id`

Alias for `GET /api/admin/users/:id`.

## Notifications and Invoice APIs

Current status:

- `src/services/emailService.js` exists
- `src/services/invoiceService.js` exists
- No mounted notification or invoice routes yet

## Example cURL Requests

### Get all products

```bash
curl https://roshinis-backend.onrender.com/api/products
```

### Get one product

```bash
curl https://roshinis-backend.onrender.com/api/products/<productId>
```

### Register

```bash
curl -X POST https://roshinis-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Rohini\",\"email\":\"user@test.com\",\"password\":\"123456\"}"
```

### Login

```bash
curl -X POST https://roshinis-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"user@test.com\",\"password\":\"123456\"}"
```

### Get profile

```bash
curl https://roshinis-backend.onrender.com/api/auth/profile \
  -H "Authorization: Bearer <jwt-token>"
```

### Create order

```bash
curl -X POST https://roshinis-backend.onrender.com/api/orders \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"123\",\"items\":[{\"productId\":\"456\",\"quantity\":1,\"price\":250}],\"totalAmount\":250,\"paymentMethod\":\"COD\",\"paymentStatus\":\"Pending\"}"
```

### Update order status

```bash
curl -X PUT https://roshinis-backend.onrender.com/api/orders/ORD-123/status \
  -H "Content-Type: application/json" \
  -d "{\"orderStatus\":\"Shipped\"}"
```

### Add wishlist item

```bash
curl -X POST https://roshinis-backend.onrender.com/api/wishlist/add \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"123\",\"productId\":\"456\"}"
```

### Remove wishlist item

```bash
curl -X DELETE https://roshinis-backend.onrender.com/api/wishlist/remove \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"123\",\"productId\":\"456\"}"
```

### Get reviews

```bash
curl https://roshinis-backend.onrender.com/api/reviews/<productId>
```

### Calculate shipping

```bash
curl -X POST https://roshinis-backend.onrender.com/api/shipping/calculate \
  -H "Content-Type: application/json" \
  -d "{\"weight\":1.5,\"pincode\":\"575001\"}"
```

## Notes

- Auth profile routes require a Bearer token
- Password hashes are no longer returned from auth APIs
- Product `image` and `updatedAt` fields are supported
- Render must be redeployed to expose the newly added routes
- Render must install the new `razorpay` dependency before `/api/payments/razorpay` will work
