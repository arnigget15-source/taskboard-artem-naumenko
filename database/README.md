# Baza danych

Baza TaskBoard używa MySQL/MariaDB i kodowania `utf8mb4`.

## Tabele i relacje

| Tabela | Przeznaczenie |
| --- | --- |
| `users` | Użytkownicy aplikacji, unikalny login i hash bcrypt hasła. |
| `boards` | Tablice i ich właściciele. |
| `tasks` | Zadania, statusy, priorytety, terminy i przypisania. |

- `boards.ownerId` → `users.id` (jeden użytkownik może mieć wiele tablic).
- `tasks.boardId` → `boards.id` (jedna tablica ma wiele zadań).
- `tasks.assigneeId` → `users.id` (opcjonalny przypisany użytkownik).
- `boards.deletedById` i `tasks.deletedById` → `users.id`.

## Import bazy w XAMPP

1. Uruchom MySQL w XAMPP i otwórz `http://localhost/phpmyadmin/`.
2. Przed importem wykonaj kopię zapasową, jeśli chcesz zachować obecne dane.
3. Zaimportuj `database/taskboard.sql`. Skrypt zaczyna się od `DROP DATABASE IF EXISTS taskboard`, więc usuwa całą istniejącą bazę `taskboard`, tworzy ją od nowa, a następnie dodaje tabele i dane testowe.
4. Skrypt dodaje 10 zadań, w tym dwa miękko usunięte. Zadanie 9 ma `deletedAt` sprzed 45 dni, a zadanie 10 ma bieżącą datę.

## Konta MySQL i uprawnienia

Plik `database/konta.sql` dodaje użytkowników APLIKACJI do tabeli `users`. To nie są konta logowania do serwera MySQL.

Osobne konta serwera MySQL tworzy `database/db_users.sql`:

| Konto MySQL | Uprawnienia |
| --- | --- |
| `taskboard_app` | SELECT, INSERT, UPDATE, DELETE na `taskboard.*` |
| `taskboard_admin` | Wszystkie uprawnienia do `taskboard.*` |
| `taskboard_readonly` | Tylko SELECT na `taskboard.*` |

Przed uruchomieniem `db_users.sql` zmień trzy hasła `CHANGE_ME_...` na własne, unikalne hasła. Następnie wykonaj ten plik w phpMyAdmin jako administrator MySQL (np. `root`). Skrypt musi być uruchomiony po utworzeniu bazy `taskboard`. Uprawnienia administratora są ograniczone do tej jednej bazy.

## Konfiguracja Backend

1. Skopiuj główny plik `.env.example` do pliku `.env` w katalogu głównym projektu.
2. W `.env` ustaw `DB_USER=taskboard_app` oraz `DB_PASSWORD` na dokładnie to samo hasło, które ustawiłeś dla `taskboard_app` w `database/db_users.sql`.
3. Pozostaw `DB_HOST=localhost`, `DB_PORT=3306` i `DB_NAME=taskboard`, jeśli XAMPP używa ustawień domyślnych.
4. Plik `.env` jest wykluczony z Git i nie może być wysyłany do GitHuba. Nie umieszczaj prawdziwych haseł w repozytorium.

`backend/db.js` ma lokalne wartości domyślne dla XAMPP, ale zalecana konfiguracja projektu to dedykowane konto `taskboard_app` zapisane w lokalnym `.env`.

## Soft delete

Rekord nie jest fizycznie kasowany. Przy usunięciu ustawiane są
`isDeleted = 1` i `deletedAt = NOW()`. Aktywne listy filtrują
`isDeleted = 0`. W API TB-2 `deletedById` pozostaje `NULL`.

## Kopia zapasowa i test odtworzenia

Kopia zapasowa znajduje się w `database/backup/taskboard.sql`. Do testu odtworzenia utwórz osobną bazę `taskboard_test`, zmień nazwę bazy w kopii z `taskboard` na `taskboard_test`, zaimportuj ją i porównaj liczbę rekordów w trzech tabelach. Nie uruchamiaj skryptu `taskboard.sql` na danych, których nie chcesz utracić.

Oczekiwana liczba rekordów po imporcie przykładowego skryptu:

- `users`: 5;
- `boards`: 2;
- `tasks`: 10 (w tym 2 miękko usunięte).

Dokładny wynik importu i połączenia trzeba sprawdzić lokalnie w phpMyAdmin/XAMPP.
