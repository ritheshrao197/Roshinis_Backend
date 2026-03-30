# Required APIs For Current Frontend

This document is based on:

- the current frontend implementation in this repository
- the updated backend guide in `API_USAGE.md`

It answers 2 questions:

1. Which APIs are already available and used by the frontend now?
2. What is still pending from the backend?

Base API URL used by the frontend:

```text
https://roshinis-backend.onrender.com/api
```

Frontend API client:

- `src/lib/api.ts`

## Current Status

## APIs Already Available And Used

These APIs are already implemented in the backend and are now integrated in the frontend:

- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `DELETE /api/products/:id`
- `GET /api/categories`
- `POST /api/coupons/apply`
- `POST /api/shipping/calculate`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id/status`
- `POST /api/payments/cod`
- `GET /api/analytics/dashboard`
- `GET /api/admin/users`

## Backend Items Still Pending

Based on the current frontend, these are the backend items still pending or still incomplete:

### Still needed for full frontend support

- `POST /api/auth/register`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`
- `PUT /api/products/:id`
- `POST /api/payments/razorpay`
- `POST /api/payments/phonepe`
- `GET /api/admin/users/:id`
- `GET /api/wishlist?userId=:userId`
- `POST /api/wishlist/add`
- `DELETE /api/wishlist/remove`
- `GET /api/reviews/:productId`
- `POST /api/reviews`

### Still not exposed as backend routes

- Notifications APIs
- Invoice APIs

### Backend setup still pending

- Deploy/redeploy backend so all updated mounted routes are live on Render
- Install backend `razorpay` dependency and configure environment variables before `/api/payments/razorpay` can work reliably

## Frontend To API Mapping

## 1. Authentication

Files:

- `src/pages/common/SignIn.tsx`
- `src/store/authSlice.ts`
- `src/pages/users/common/Profile.tsx`

### Already available

#### `POST /api/auth/login`

Purpose:

- Sign in user
- Persist token and user in frontend state

Status:

- Implemented in backend
- Integrated in frontend

### Still pending from backend

#### `POST /api/auth/register`

Purpose:

- Needed when signup screen is added

Status:

- Available in backend guide, but not yet integrated in frontend

#### `GET /api/auth/profile`

Purpose:

- Needed to replace the current Google/local-only profile page with backend profile data

Status:

- Available in backend guide
- Not integrated in frontend yet

#### `PUT /api/auth/profile`

Purpose:

- Needed for editable profile screen

Status:

- Available in backend guide
- Not integrated in frontend yet

## 2. Public Catalog

Files:

- `src/pages/users/Home.tsx`
- `src/pages/users/Shop.tsx`
- `src/pages/users/ProductDetailPage.tsx`
- `src/store/productSlice.ts`

### Already available

#### `GET /api/products`

Purpose:

- Product listing on home and shop

Status:

- Integrated

#### `GET /api/products/:id`

Purpose:

- Direct product detail fetch by route param

Status:

- Integrated

### Still pending from backend

#### `PUT /api/products/:id`

Purpose:

- Needed for real product editing in admin product detail flow

Status:

- Available in backend guide
- Not integrated in frontend yet

## 3. Admin Products

Files:

- `src/pages/admin/AdminManageProducts.tsx`
- `src/pages/admin/components/AddProductForm.tsx`
- `src/pages/admin/AdminViewProductDetails.tsx`

### Already available

#### `POST /api/products`

Purpose:

- Create product

Status:

- Integrated

#### `DELETE /api/products/:id`

Purpose:

- Delete product from admin product list

Status:

- Integrated

### Still pending from backend

#### `PUT /api/products/:id`

Purpose:

- Save edits from admin product detail page
- Update stock and product fields

Status:

- Available in backend guide
- Frontend edit UI is still not connected

## 4. Checkout And Orders

Files:

- `src/pages/users/OrderCheckout.tsx`
- `src/pages/admin/AdminManageOrders.tsx`
- `src/pages/admin/components/OrderDetailPage.tsx`

### Already available

#### `POST /api/shipping/calculate`

Purpose:

- Calculate shipping during checkout

Status:

- Integrated

#### `POST /api/coupons/apply`

Purpose:

- Apply coupon during checkout

Status:

- Integrated

#### `POST /api/orders`

Purpose:

- Create order

Status:

- Integrated

#### `GET /api/orders`

Purpose:

- Load admin orders list

Status:

- Integrated

#### `GET /api/orders/:id`

Purpose:

- Load admin order detail

Status:

- Integrated

#### `PUT /api/orders/:id/status`

Purpose:

- Update order status from admin order detail page

Status:

- Integrated

## 5. Payments

Files:

- `src/pages/users/OrderCheckout.tsx`

### Already available

#### `POST /api/payments/cod`

Purpose:

- COD confirmation after order creation

Status:

- Integrated

### Still pending from backend

#### `POST /api/payments/razorpay`

Purpose:

- Online payment checkout

Status:

- Backend route exists
- Frontend not integrated yet
- Backend setup still depends on Razorpay SDK installation and env vars

#### `POST /api/payments/phonepe`

Purpose:

- Alternative online payment checkout

Status:

- Backend route exists
- Frontend not integrated yet

## 6. Admin Dashboard And Users

Files:

- `src/pages/admin/AdminDashboard.tsx`
- `src/pages/admin/AdminManageUsers.tsx`

### Already available

#### `GET /api/analytics/dashboard`

Purpose:

- Dashboard cards

Status:

- Integrated with richer response fields

#### `GET /api/admin/users`

Purpose:

- Admin users listing

Status:

- Integrated

### Still pending from backend

#### `GET /api/admin/users/:id`

Purpose:

- Needed if user detail page or user profile drawer is added later

Status:

- Available in backend guide
- Not used by frontend yet

## 7. Wishlist And Reviews

Current frontend status:

- Backend APIs are now available in the guide
- Frontend UI is not integrated yet

### Still pending from backend/frontend delivery

#### `GET /api/wishlist?userId=:userId`

Purpose:

- Load wishlist

Status:

- Backend available
- Frontend not integrated

#### `POST /api/wishlist/add`

Purpose:

- Add item to wishlist

Status:

- Backend available
- Frontend not integrated

#### `DELETE /api/wishlist/remove`

Purpose:

- Remove item from wishlist

Status:

- Backend available
- Frontend not integrated

#### `GET /api/reviews/:productId`

Purpose:

- Load dedicated review list for product detail page

Status:

- Backend available
- Frontend not integrated

#### `POST /api/reviews`

Purpose:

- Submit review from product detail page

Status:

- Backend available
- Frontend not integrated

## 8. Categories

Files:

- `src/pages/users/Shop.tsx`
- `src/pages/admin/components/AddProductForm.tsx`

### Already available

#### `GET /api/categories`

Purpose:

- Category filter and category dropdowns

Status:

- Integrated

### Lower priority backend items

#### `POST /api/categories`

- Backend available
- Not used in frontend currently

#### `PUT /api/categories/:id`

- Backend available
- Not used in frontend currently

#### `DELETE /api/categories/:id`

- Backend available
- Not used in frontend currently

## What Is Actually Pending From Backend Now

If we focus only on backend work still pending after the latest API update, the list is short:

### Route-level backend gaps

1. Notification routes are still not exposed
2. Invoice routes are still not exposed

### Operational/backend setup gaps

1. Render deployment must include the newly updated routes
2. Razorpay backend dependency and env setup must be completed for Razorpay payments

## What Is Not A Backend Gap Anymore

These were previously pending, but are no longer backend blockers according to the updated `API_USAGE.md`:

- `/api/auth` mounted
- `/api/orders` mounted
- `/api/payments` mounted
- `/api/admin` mounted
- `GET /api/products/:id` available
- `PUT /api/products/:id` available
- `DELETE /api/products/:id` available
- `GET /api/orders/:id` available
- `PUT /api/orders/:id/status` available
- `GET /api/admin/users` available
- `GET /api/admin/users/:id` available
- `GET /api/auth/profile` available
- `PUT /api/auth/profile` available
- `DELETE /api/wishlist/remove` available
- `GET /api/reviews/:productId` available

## Practical Next Step

From here, the remaining work is mostly frontend integration work rather than backend route creation:

1. Integrate backend profile APIs into `Profile.tsx`
2. Add Razorpay or PhonePe flow in checkout
3. Add wishlist UI integration
4. Add reviews UI integration
5. Add product edit UI integration with `PUT /api/products/:id`

