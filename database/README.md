# TaskBoard database (MySQL / MariaDB)

The schema is designed to match the current backend routes in `backend/routes/auth.js`, `users.js`, `boards.js`, and `tasks.js`.

## Full reset and import into XAMPP

1. Start MySQL in XAMPP and open `http://localhost/phpmyadmin/`.
2. If you need existing data, export a backup first.
3. Select the MySQL server (not a limited application account), open **Import**, and import `database/taskboard.sql`.
4. The script runs `DROP DATABASE IF EXISTS taskboard`, recreates the database, creates all three tables, and inserts sample data. This is intentionally destructive for the `taskboard` database.
5. After the database exists, run `database/konta.sql` as MySQL administrator to create/reset the app account and grant permissions.

The app MySQL account is `taskboard_app`, password `TBpassword123`, database `taskboard`. This credential is for local classroom/XAMPP development only. Do not use it on an internet-facing server. If this repository is public, anyone can read it; change the password before deployment.

## Tables and backend compatibility

- `users`: `id`, `login`, `passwordHash`, `firstName`, `lastName`, `createdAt`. Registration inserts these exact columns; passwords are bcrypt hashes.
- `boards`: owner, name/description, timestamps and soft-delete fields.
- `tasks`: board, optional assignee, status (`todo`, `in_progress`, `done`), priority (`low`, `medium`, `high`), deadline and soft-delete fields.

Foreign keys connect board owners/deleters and task boards/assignees/deleters to `users`. The backend soft-deletes records by setting `isDeleted=1`, `deletedAt=NOW()`, and `deletedById`; it does not physically delete them.

## MySQL accounts

`database/konta.sql` creates three database accounts:

| Account | Permissions |
| --- | --- |
| `taskboard_app` | SELECT, INSERT, UPDATE on `taskboard.*` |
| `taskboard_admin` | All privileges on `taskboard.*` |
| `taskboard_readonly` | SELECT on `taskboard.*` |

The app password is set to `TBpassword123` to match the requested local `.env`. Replace the `CHANGE_ME_...` values in `konta.sql` before using the optional admin/read-only accounts. Run the file as MySQL administrator after importing the database.

## Environment file and random session secret

The real `.env` file belongs in the project root and is ignored by Git. To create it with a fresh random session secret, run this from the project root:

```bash
node backend/create-env.js
```

The script creates `.env` from `.env.example`, generates a cryptographically random `SESSION_SECRET`, and refuses to overwrite an existing `.env`. The template sets `DB_USER=taskboard_app`, `DB_PASSWORD=TBpassword123`, and `DB_NAME=taskboard`.

Keep `.env` private; never commit it or share its contents.

## Sample data and verification

The import creates 5 sample app users, 2 boards, and 10 tasks (8 active and 2 soft-deleted). Task 9 has a deletion timestamp 45 days in the past; task 10 has a current deletion timestamp.

Run `database/queries.sql` to inspect common queries. Expected row counts immediately after import:

- `users`: 5
- `boards`: 2
- `tasks`: 10
