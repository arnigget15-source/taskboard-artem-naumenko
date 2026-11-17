# TaskBoard API

Adres lokalnego serwera: http://localhost:3000. Wszystkie odpowiedzi API używają JSON, z wyjątkiem udanego wylogowania i usuwania (204). Trasy /api/users, /api/boards i /api/tasks wymagają aktywnej sesji. Po logowaniu przeglądarka i Postman przechowują ciasteczko sesji.

## Uwierzytelnianie

| Metoda | Trasa | Opis | Sukces |
| --- | --- | --- | --- |
| POST | /api/auth/register | Rejestracja i automatyczne zalogowanie | 201 |
| POST | /api/auth/login | Logowanie | 200 |
| GET | /api/auth/me | Dane zalogowanego użytkownika | 200 |
| POST | /api/auth/logout | Zakończenie sesji | 204 |

Przykład rejestracji:

```json
{
  "login": "jan.nowak",
  "password": "minimum-8-znakow",
  "firstName": "Jan",
  "lastName": "Nowak"
}
```

Odpowiedź nie zawiera passwordHash.

## Tablice

| Metoda | Trasa | Opis | Sukces |
| --- | --- | --- | --- |
| GET | /api/boards | Tablice zalogowanego użytkownika | 200 |
| POST | /api/boards | Utworzenie tablicy | 201 |
| PUT | /api/boards/:id | Edycja własnej tablicy | 200 |
| DELETE | /api/boards/:id | Miękkie usunięcie własnej tablicy | 204 |

Przykład POST/PUT:

```json
{
  "name": "Organizacja praktyk",
  "description": "Sprawy organizacyjne i terminy"
}
```

## Zadania

| Metoda | Trasa | Opis | Sukces |
| --- | --- | --- | --- |
| GET | /api/boards/:boardId/tasks | Lista aktywnych zadań tablicy | 200 |
| GET | /api/tasks/:id | Szczegóły zadania | 200 |
| POST | /api/tasks | Dodanie zadania | 201 |
| PUT | /api/tasks/:id | Edycja zadania lub zmiana statusu | 200 |
| DELETE | /api/tasks/:id | Miękkie usunięcie zadania | 204 |

Przykład POST/PUT:

```json
{
  "title": "Przygotować makietę",
  "description": "Dokończyć widok tablicy",
  "status": "todo",
  "priority": "high",
  "deadline": "2026-11-20",
  "boardId": 1,
  "assigneeId": 1
}
```

Dozwolone statusy: todo, in_progress, done. Dozwolone priorytety: low, medium, high. Tytuł ma od 3 do 100 znaków. Termin ma format RRRR-MM-DD lub null.

### Filtry listy zadań

Filtry można łączyć w jednym zapytaniu:

```
GET /api/boards/1/tasks?priority=high&assigneeId=2&q=API
```

- priority – low, medium albo high;
- assigneeId – dodatnia liczba całkowita;
- q – fragment tytułu wyszukiwany przez SQL LIKE.

Nieprawidłowy priorytet, assigneeId lub dane formularza zwracają 400. Brak tablicy albo zadania zwraca 404.

## Użytkownicy

| Metoda | Trasa | Opis | Sukces |
| --- | --- | --- | --- |
| GET | /api/users | Lista użytkowników do przypisywania zadań | 200 |

Zwracane pola: id, login, firstName, lastName. Pole passwordHash nigdy nie jest zwracane.
