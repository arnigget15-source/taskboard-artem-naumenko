# Testy TaskBoard TB-3

Wynik wpisuj po wykonaniu testu w lokalnym środowisku. Scenariusze mają status „Do wykonania”, dopóki nie zostaną sprawdzone w uruchomionej aplikacji.

| ID | Scenariusz | Kroki | Oczekiwany wynik | Wynik |
| --- | --- | --- | --- | --- |
| T-01 | Dostęp bez logowania | Otworzyć /boards.html bez sesji | Przekierowanie na login.html | Do wykonania |
| T-02 | Lista tablic bez sesji | GET /api/boards bez ciasteczka | 401 | Do wykonania |
| T-03 | Rejestracja | POST /api/auth/register z poprawnymi polami | 201, sesja i dane bez passwordHash | Do wykonania |
| T-04 | Zajęty login | Ponownie zarejestrować ten sam login | 409 | Do wykonania |
| T-05 | Niepoprawny login | Rejestracja z loginem krótszym niż 3 znaki lub niedozwolonym znakiem | 400 | Do wykonania |
| T-06 | Zbyt krótkie hasło | Rejestracja hasłem krótszym niż 8 znaków | 400 | Do wykonania |
| T-07 | Błędne logowanie | POST /api/auth/login z błędnym hasłem | 401 | Do wykonania |
| T-08 | Poprawne logowanie | POST /api/auth/login z poprawnym loginem i hasłem | 200 i ciasteczko sesji | Do wykonania |
| T-09 | Wylogowanie | POST /api/auth/logout, następnie GET /api/auth/me | 204, potem 401 | Do wykonania |
| T-10 | Lista użytkowników | GET /api/users po zalogowaniu | 200; odpowiedź nie zawiera passwordHash | Do wykonania |
| T-11 | Dodanie tablicy | POST /api/boards z nazwą | 201 | Do wykonania |
| T-12 | Pusta nazwa tablicy | POST /api/boards z pustą nazwą | 400 i komunikat walidacji | Do wykonania |
| T-13 | Dodanie zadania | POST /api/tasks z poprawnym JSON i własnym boardId | 201 | Do wykonania |
| T-14 | Niepoprawny tytuł zadania | POST /api/tasks z tytułem krótszym niż 3 znaki | 400 | Do wykonania |
| T-15 | Filtr priorytetu | GET /api/boards/:boardId/tasks?priority=high | 200; każde zadanie ma priority=high | Do wykonania |
| T-16 | Filtr osoby | GET /api/boards/:boardId/tasks?assigneeId=:userId | 200; każde zadanie ma wskazany assigneeId | Do wykonania |
| T-17 | Filtr tytułu | GET /api/boards/:boardId/tasks?q=API | 200; tytuły pasują do frazy API | Do wykonania |
| T-18 | Połączone filtry | GET /api/boards/:boardId/tasks?priority=high&assigneeId=:userId&q=API | 200; wszystkie trzy warunki są spełnione | Do wykonania |
| T-19 | Nieprawidłowy assigneeId | GET /api/boards/:boardId/tasks?assigneeId=abc | 400 | Do wykonania |
| T-20 | Nieprawidłowy priorytet | GET /api/boards/:boardId/tasks?priority=urgent | 400 | Do wykonania |
| T-21 | Brakujące zadanie | GET /api/tasks/999999 | 404 | Do wykonania |
| T-22 | Usunięcie zadania | DELETE /api/tasks/:taskId, potem lista zadań | 204; zadanie nie występuje na liście | Do wykonania |
| T-23 | Izolacja tablic | Zalogować się na drugie konto i otworzyć cudzą tablicę | 404 | Do wykonania |
| T-24 | Niepoprawny JSON | POST /api/tasks z niepoprawnym body JSON | 400, komunikat o niepoprawnym JSON | Do wykonania |
| T-25 | UI: walidacja logowania | Wysłać pusty formularz logowania | Pola oznaczone jako niepoprawne; komunikat widoczny | Do wykonania lokalnie |
| T-26 | UI: walidacja rejestracji | Wprowadzić login/hasło niezgodne z regułami | Błędne pola oznaczone; formularz nie wysyła żądania | Do wykonania lokalnie |
| T-27 | UI: CRUD tablic | Utworzyć, edytować i usunąć własną tablicę | Zmiany widoczne na liście; usunięcie potwierdzone | Do wykonania lokalnie |
| T-28 | UI: CRUD zadań | Utworzyć, edytować, zmienić status i usunąć zadanie | Każda zmiana widoczna na tablicy | Do wykonania lokalnie |
| T-29 | UI: responsywność | Sprawdzić tablice i Kanban na szerokości telefonu | Układ nie powoduje poziomego przewijania strony | Do wykonania lokalnie |
| T-30 | Dostępność | Uruchomić Lighthouse Accessibility i W3C HTML Validator | Lighthouse ≥90; W3C bez błędów | Do wykonania lokalnie |

## Testy interfejsu i dostępności
- [ ] Rejestracja: wymagane pola, format loginu, długość hasła i zgodność powtórzenia hasła.
- [ ] Logowanie: puste pola i błędne dane pokazują komunikat.
- [ ] Formularz tablicy: pusta nazwa i zbyt długi opis są oznaczone jako niepoprawne.
- [ ] Formularz zadania: niepoprawny tytuł, opis i termin są oznaczone jako niepoprawne.
- [ ] Błędy API są pokazywane użytkownikowi.
- [ ] Filtry priorytetu, osoby i tytułu działają osobno i razem.
- [ ] Filtry można wyczyścić jednym przyciskiem.
- [ ] Tablice i zadania można tworzyć, edytować i usuwać.
- [ ] Po wylogowaniu chronione strony wymagają ponownego logowania.
- [ ] Interfejs jest czytelny na szerokości telefonu i komputera.
- [ ] Pola formularzy mają etykiety, a komunikaty błędów są dostępne dla czytników ekranu.
- [ ] Lighthouse Accessibility: wynik co najmniej 90 (wpisać rzeczywisty wynik).
- [ ] Każdy plik HTML przechodzi walidację W3C bez błędów.

## Przygotowanie środowiska i kolejność testów
1. Uruchom MySQL w XAMPP i sprawdź, czy baza taskboard istnieje.
2. W katalogu głównym przygotuj lokalny .env na podstawie .env.example.
3. W folderze backend/ wykonaj npm install, npm run check, a następnie npm start.
4. Otwórz http://localhost:3000/ i utwórz konto testowe przez formularz rejestracji.
5. Zaimportuj docs/postman/TaskBoard-TB3.postman_collection.json do Postmana. Postman powinien zachowywać ciasteczko sesji między żądaniami.
6. Wykonaj Register albo Login, następnie Create board. Kolekcja zapisuje identyfikator tablicy w zmiennej boardId.
7. Wykonaj żądania w folderze Tasks and filters. Create task zapisuje identyfikator zadania w taskId.
8. Dla filtrów użyj ID użytkownika, który istnieje w bazie i może być przypisany do zadania na Twojej tablicy.
9. Żądanie Delete board znajduje się na końcu kolekcji.
10. Po każdym teście wpisz rzeczywisty status HTTP i wynik w kolumnie Wynik.

Nie wpisuj haseł z lokalnego .env do kolekcji ani do repozytorium.
