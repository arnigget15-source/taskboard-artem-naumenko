# Backend

TaskBoard uses Node.js, Express, MySQL/MariaDB, bcryptjs, and express-session.

## Local setup with XAMPP

1. Start MySQL in XAMPP.
2. Import `database/taskboard.sql` into phpMyAdmin as a MySQL administrator. It drops and recreates the `taskboard` database.
3. Run `database/konta.sql` as MySQL administrator. The backend account is `taskboard_app` with local password `TBpassword123`.
4. From the project root, create a local environment file and random session secret:

   ```bash
   node backend/create-env.js
   ```

   The script creates `.env` only if it does not already exist. It will not overwrite existing settings.
5. In a terminal, run:

   ```bash
   cd backend
   npm install
   npm start
   ```

6. Open `http://localhost:3000/`.

## Environment

The project-root `.env` must use `DB_HOST=localhost`, `DB_PORT=3306`, `DB_USER=taskboard_app`, `DB_PASSWORD=TBpassword123`, and `DB_NAME=taskboard` for the supplied local SQL setup. The `.env` file is ignored by Git. Do not commit it or use the classroom database password in production.

## Security

Application passwords are stored as bcrypt hashes. Session IDs are stored in httpOnly, sameSite=lax cookies. Routes under `/api/users`, `/api/boards`, and `/api/tasks` require authentication. Board/task operations check board ownership.

The built-in express-session memory store is for local development only. Production requires a persistent session store and HTTPS.

## Routes

- POST `/api/auth/register`, POST `/api/auth/login`, GET `/api/auth/me`, POST `/api/auth/logout`.
- GET/POST `/api/boards`, PUT/DELETE `/api/boards/:id`.
- GET `/api/boards/:boardId/tasks` with filters `priority`, `assigneeId`, and `q`.
- GET `/api/tasks/:id`, POST `/api/tasks/:id`, PUT/DELETE `/api/tasks/:id`.
- GET `/api/users` returns users without `passwordHash`.

## Syntax check

From `backend/`, run `npm run check`.
