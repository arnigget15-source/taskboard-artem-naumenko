# Baza danych

Baza TaskBoard używa MySQL/MariaDB i kodowania `utf8mb4`.

## Tabele i relacje

| Tabela | Przeznaczenie |
| --- | --- |
| `users` | Użytkownicy, unikalny login i hash bcrypt hasła. |
| `boards` | Tablice i ich właściciele. |
| `tasks` | Zadania, statusy, priorytety, terminy i przypisania. |

- `boards.ownerId` → `users.id` (jeden użytkownik może mieć wiele tablic).
- `tasks.boardId` → `boards.id` (jedna tablica ma wiele zadań).
- `tasks.assigneeId` → `users.id` (opcjonalny przypisany użytkownik).
- `boards.deletedById` i `tasks.deletedById` → `users.id`.

## Konfiguracja połączenia z XAMPP

1. W głównym katalogu projektu skopiuj `.env.example` do pliku `.env`.
2. Dla standardowego XAMPP оставь значения: `DB_HOST=localhost`, `DB_PORT=3306`, `DB_USER=root`, pustой `DB_PASSWORD`, `DB_NAME=taskboard`.
3. Если у пользователя MySQL установлен пароль, укажи его только в локальном `.env`.
4. Файл `.env` исключён из Git и не должен отправляться в GitHub.
5. Если MySQL настроен иначе, измени соответствующие значения в `.env`.

Файл `backend/db.js` использует те же значения по умолчанию, поэтому локальный XAMPP обычно работает даже без созданного `.env`.

## Soft delete

Rekord nie jest fizycznie kasowany. Przy usunięciu ustawiane są
`isDeleted = 1` i `deletedAt = NOW()`. Aktywne listy filtrują
`isDeleted = 0`. W API TB-2 `deletedById` pozostaje `NULL`.

## Import i kopia zapasowa

1. Uruchom MySQL w XAMPP i otwórz `http://localhost/phpmyadmin/`.
2. Zaimportuj `database/taskboard.sql`. Skrypt tworzy bazę `taskboard`,
   tabele i 10 testowych zadań (w tym 2 soft delete).
3. Opcjonalny plik `database/konta.sql` dodaje konta testowe.
4. Kopia zapasowa znajduje się w `database/backup/taskboard.sql`.
5. Do testu odtworzenia utwórz `taskboard_test`, zmień nazwę bazy w kopii
   na `taskboard_test`, zaimportuj i porównaj liczbę rekordów w trzech tabelach.

Dokładny wynik testu importu trzeba sprawdzić lokalnie w phpMyAdmin.
