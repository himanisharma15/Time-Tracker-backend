# TimeTrackr - Backend scaffold

This is a small Express backend scaffold included in the project for demo purposes.

Files added:

- `server.js` - Express app entrypoint
- `routes/` - API routes (`/api/auth` and root API)
- `controllers/` - controller stubs (auth demo using in-memory storage)
- `models/` - example Mongoose model (User)
- `config/db.js` - helper to connect to MongoDB (optional)
- `package.json` - backend dependencies and scripts

Quick start (locally):

```bash
cd backend
npm install
# development with auto-reload (requires nodemon)
npm run dev
# or run production
npm start
```

The server listens on `process.env.PORT` or `4000` by default and mounts API under `/api` (e.g. `POST /api/auth/signup`).

Notes:
- The `controllers/authController.js` currently uses an in-memory user for demo and `bcrypt` to hash passwords. Replace with database logic and JWT as needed for production.
- To enable MongoDB, set `MONGO_URI` environment variable.

If you want, I can:
- Wire these endpoints to the frontend (replace the localStorage demo with API calls).
- Add JWT issuance on login and a middleware to protect routes.
- Add unit tests or a Postman collection for quick API testing.
