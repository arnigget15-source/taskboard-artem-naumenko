# TaskBoard

TaskBoard to strona, która ma pomagać w organizowaniu zadań. Użytkownik będzie mógł tworzyć tablice, dodawać do nich zadania i sprawdzać, co jest już zrobione, a co jeszcze trzeba wykonać.

Projekt jest w trakcie przygotowania. Repozytorium zawiera dokumentację, frontend oraz backend rozwijany etapami.

## Co będzie można zrobić na stronie?

- założyć konto i zalogować się;
- tworzyć własne tablice;
- dodawać zadania do tablic;
- edytować i usuwać zadania;
- zmieniać status zadania;
- ustawiać priorytet i termin;
- przypisywać zadania do użytkowników;
- wyszukiwać i filtrować zadania.

## Technologie

- **HTML** i **CSS** – struktura i wygląd strony;
- **JavaScript** – logika frontendowa i backendowa;
- **Bootstrap** – układ elementów strony;
- **Node.js** i **Express** – backend API;
- **MySQL/MariaDB** – baza danych;
- **Git i GitHub** – kontrola wersji.

## Struktura repozytorium

- `frontend/` – widoki, formularze, style i skrypty strony.
- `backend/` – serwer Express, trasy API i połączenie z bazą.
- `database/` – skrypty SQL, zapytania i kopie zapasowe.
- `docs/` – dokumentacja i kolekcja Postman.
- `materialy/` – makiety, diagram ERD i pliki pomocnicze.
- `.github/` – konfiguracja automatycznego sprawdzania.

## Baza danych

Baza danych nazywa się `taskboard` i składa się z trzech tabel:

| Tabela | Zawartość |
| --- | --- |
| `users` | Loginy, hashe haseł i dane użytkowników. |
| `boards` | Nazwy tablic, właściciel i pola usuwania. |
| `tasks` | Tytuł, opis, status, priorytet, termin i przypisany użytkownik. |

Relacje:
- `boards.ownerId` wskazuje na `users.id`.
- `tasks.boardId` wskazuje na `boards.id`.
- `tasks.assigneeId` wskazuje na `users.id` i może być pusty.
- `deletedById` w tablicach i zadaniach wskazuje na użytkownika, który usunął rekord.

Usuwanie jest miękkie (soft delete): rekord pozostaje w bazie, a aplikacja ustawia
`isDeleted = 1` i `deletedAt`. Listy API zwracają tylko rekordy z
`isDeleted = 0`. Pole `deletedById` dla zadań pozostaje puste do kolejnego etapu.

### Odtworzenie bazy w XAMPP

1. Uruchom MySQL w XAMPP Control Panel.
2. Otwórz `http://localhost/phpmyadmin/`.
3. Wybierz Import i wskaż plik `database/taskboard.sql`.
4. Plik tworzy bazę `taskboard`, tabele i przykładowe rekordy.
5. Plik `database/konta.sql` zawiera dodatkowe konta testowe. Importuj go po utworzeniu tabeli `users`; duplikaty loginów nie tworzą nowych rekordów.

### Kopia zapasowa i test odtworzenia

Kopia znajduje się w `database/backup/taskboard.sql`. Aby sprawdzić odtworzenie:
1. Utwórz pustą bazę `taskboard_test` w phpMyAdmin.
2. W kopii zmień nazwę bazy w instrukcjach `CREATE DATABASE` i `USE`
   z `taskboard` na `taskboard_test`.
3. Zaimportuj zmieniony plik do phpMyAdmin.
4. Porównaj liczbę rekordów poleceniami:

```sql
SELECT 'users' AS tabela, COUNT(*) AS rekordy FROM taskboard.users
UNION ALL
SELECT 'boards', COUNT(*) FROM taskboard.boards
UNION ALL
SELECT 'tasks', COUNT(*) FROM taskboard.tasks;

SELECT 'users' AS tabela, COUNT(*) AS rekordy FROM taskboard_test.users
UNION ALL
SELECT 'boards', COUNT(*) FROM taskboard_test.boards
UNION ALL
SELECT 'tasks', COUNT(*) FROM taskboard_test.tasks;
```

Oczekiwana liczba po imporcie przykładowego skryptu:
- `users`: 5;
- `boards`: 2;
- `tasks`: 10 (w tym 2 miękko usunięte).

Samo repozytorium nie może potwierdzić wyniku lokalnego importu — porównanie należy
wykonać w phpMyAdmin.

## API

Backend uruchamia się poleceniem `npm start` w folderze `backend/`.
Dostępne trasy etapu TB-2:
- `GET /api/boards`;
- `GET /api/boards/:boardId/tasks`;
- `GET /api/tasks/:id`;
- `POST /api/tasks`;
- `PUT /api/tasks/:id`;
- `DELETE /api/tasks/:id` (soft delete);
- `GET /api/users` (bez pola `passwordHash`).

Kolekcja testów znajduje się w
`docs/postman/TaskBoard-TB2.postman_collection.json`.

## Przydatne pliki

- [Backend](backend/README.md)
- [Baza danych](database/README.md)
- [Dokumentacja](docs/README.md)
- [Materiały](materialy/README.md)
- [Diagram ERD](materialy/erd.md)
