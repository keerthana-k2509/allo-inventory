# ALLO Inventory Reservation System

Inventory reservation system built using Next.js, Prisma, PostgreSQL, and Neon.

## Features

### Backend
- Product inventory management
- Reservation creation
- Reservation confirmation
- Reservation release/cancellation
- Warehouse stock tracking
- Inventory validation to prevent over-reservation

### Frontend
- Product listing page
- Warehouse and stock visibility
- Reserve button
- Reservation success page
- Frontend connected with backend APIs

---

## Tech Stack

- Next.js
- TypeScript
- Prisma
- PostgreSQL
- Neon Database

---

## Setup Instructions

Clone repository:

```bash
git clone https://github.com/keerthana-k2509/allo-inventory.git
```

Move into project folder:

```bash
cd allo-inventory
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open frontend:

```bash
http://localhost:3000/products
```

---

## Project Flow

1. User opens product page
2. Product inventory is fetched from backend API
3. Products and warehouse stock are displayed
4. User clicks **Reserve Now**
5. Reservation API is called
6. Reservation gets created
7. User is redirected to success page

---

## API Endpoints

### Get Products

```http
GET /api/products
```

### Create Reservation

```http
POST /api/reservations
```

Request:

```json
{
  "productId": "cmpjzsk150000qo7sjs1ui0hs",
  "warehouseId": "cmpjzsk5a0002qo7svbbnwg0o",
  "quantity": 1
}
```

### Confirm Reservation

```http
POST /api/reservations/{id}/confirm
```

### Release Reservation

```http
POST /api/reservations/{id}/release
```

---

## Screenshots

### Product Listing Page

Displays products, warehouse details, stock availability and reserve action.

![Product Page](./screenshots/product-page.png)

### Reservation Success Page

Shown after reservation is successfully created.

![Reservation Success](./screenshots/reservation-success.png)

### Products API

![Products API](./screenshots/products-api.png)

---

## Notes

- Built for ALLO campus placement take-home exercise
- Inventory reservation logic prevents stock overbooking
- Frontend and backend integrated successfully
- End-to-end reservation workflow implemented