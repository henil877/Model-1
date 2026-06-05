# BloomShop Fixed Setup

## What changed
- Removed React `src/Pages/Registration.js` route usage.
- Start page now redirects to: `/model_1_StaticWeb/Register.html`.
- Static `Register.html` connects to Node + MongoDB using `/api/register`.
- Static `Login.html` connects to Node + MongoDB using `/api/login`.
- `payment.html` saves order/payment data to MongoDB using `/api/orders`.
- `orderhistory.html` loads saved orders from MongoDB using `/api/my-orders/:userId`.
- Backend `index.js` is now a real Express + MongoDB API server.

## Run backend
```bash
cd "Full stack/Backend"
npm install
npm run server
```
Backend runs on: `http://localhost:8080`

## Open website
Use backend URL directly:
```text
http://localhost:8080/
```
It will open registration page first.

## MongoDB
Backend uses `.env`:
```env
MONGO_URI=your_mongodb_connection_string
PORT=8080
```

Updated static header:
- ProductList link added: /model_1_StaticWeb/productlist.html
- Show User link added: /model_1_StaticWeb/showusers.html
- Show User page fetches users from Node.js API: /api/users
