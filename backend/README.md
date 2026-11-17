# Backend

Backend TaskBoard działa na Node.js i Express. Udostępnia API, łączy się z MySQL/MariaDB przez mysql2, a logowanie i rejestracja korzystają z bcryptjs oraz sesji express-session.

## Instalacja i uruchomienie

1. Uruchom MySQL w XAMPP i przygotuj bazę zgodnie z database/README.md.
2. W katalogu głównym skopiuj .env.example do .env i wpisz własne dane połączenia oraz długi losowy SESSION_SECRET.
3. W terminalu przejdź do backend/ i wykonaj npm install.
4. Uruchom npm start.
5. Otwórz http://localhost:3000/.

## Bezpieczeństwo

Hasła są przechowywane wyłącznie jako hash bcrypt. Identyfikator użytkownika jest przechowywany w sesji, a ciasteczko sesji ma ustawienia httpOnly i sameSite=lax. Wszystkie trasy /api/users, /api/boards i /api/tasks wymagają zalogowania. Operacje na tablicach i zadaniach sprawdzają właściciela tablicy.

Wbudowany magazyn sesji Express służy do lokalnego developmentu; przed wdrożeniem produkcyjnym należy skonfigurować trwały magazyn sesji i HTTPS.

## Trasy

- POST /api/auth/register, POST /api/auth/login, GET /api/auth/me, POST /api/auth/logout.
- GET/POST /api/boards, PUT/DELETE /api/boards/:id.
- GET /api/boards/:boardId/tasks z filtrami priority, assigneeId i q.
- GET /api/tasks/:id, POST /api/tasks, PUT /api/tasks/:id, DELETE /api/tasks/:id.
- GET /api/users – lista użytkowników bez passwordHash.

## Sprawdzenie składni

W katalogu backend/ wykonaj npm run check.
