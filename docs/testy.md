# Testy TaskBoard TB-3

Wynik wpisuj po wykonaniu testu w lokalnym środowisku. Aktualnie wszystkie scenariusze mają status „Do wykonania”; nie oznaczono ich jako zaliczone bez uruchomienia aplikacji.

| ID | Scenariusz | Kroki | Oczekiwany wynik | Wynik |
| --- | --- | --- | --- | --- |
| T-01 | Dostęp bez logowania | Otworzyć /boards.html bez sesji | Przekierowanie na login.html | Do wykonania |
| T-02 | Lista tablic bez sesji | GET /api/boards bez ciasteczka | 401 | Do wykonania |
| T-03 | Rejestracja | POST /api/auth/register z poprawnymi polami | 201, sesja i dane użytkownika bez passwordHash | Do wykonania |
| T-04 | Zajęty login | Ponownie zarejestrować ten sam login | 409 | Do wykonania |
| T-05 | Zbyt krótkie hasło | Rejestracja hasłem krótszym niż 8 znaków | 400 | Do wykonania |
| T-06 | Błędne logowanie | POST /api/auth/login z błędnym hasłem | 401 | Do wykonania |
| T-07 | Poprawne logowanie | POST /api/auth/login z poprawnym loginem i hasłem | 200 i ciasteczko sesji | Do wykonania |
| T-08 | Wylogowanie | POST /api/auth/logout, następnie GET /api/auth/me | 204, potem 401 | Do wykonania |
| T-09 | Dodanie tablicy | POST /api/boards z nazwą | 201 | Do wykonania |
| T-10 | Pusta nazwa tablicy | POST /api/boards z pustą nazwą | 400 | Do wykonania |
| T-11 | Dodanie zadania | POST /api/tasks z poprawnym JSON | 201 | Do wykonania |
| T-12 | Pusty lub krótki tytuł | POST /api/tasks z tytułem krótszym niż 3 znaki | 400 | Do wykonania |
| T-13 | Filtr priorytetu | GET /api/boards/1/tasks?priority=high | 200, tylko zadania high | Do wykonania |
| T-14 | Nieprawidłowy assigneeId | GET /api/boards/1/tasks?assigneeId=abc | 400 | Do wykonania |
| T-15 | Połączone filtry | GET /api/boards/1/tasks?priority=high&assigneeId=1&q=API | 200, wszystkie filtry zastosowane | Do wykonania |
| T-16 | Brakujące zadanie | GET /api/tasks/999999 | 404 | Do wykonania |
| T-17 | Usunięcie zadania | DELETE /api/tasks/:id, potem lista zadań | 204, zadanie nie występuje na liście | Do wykonania |
| T-18 | Izolacja tablic | Zalogować się na drugie konto i otworzyć cudzą tablicę | 404 | Do wykonania |

## Testy interfejsu

- [ ] Logowanie i rejestracja na komputerze i telefonie.
- [ ] Formularze pokazują błędy przy niepoprawnych danych.
- [ ] Tworzenie, edycja i usuwanie tablic.
- [ ] Dodawanie, edycja, szczegóły, zmiana statusu i usuwanie zadań.
- [ ] Wszystkie filtry działają osobno i łącznie.
- [ ] Po wylogowaniu chronione strony wymagają ponownego logowania.
- [ ] Lighthouse Accessibility ma wynik co najmniej 90.
- [ ] Każdy plik HTML przechodzi walidację W3C bez błędów.


## Przygotowanie środowiska i kolejność testów

1. Uruchom MySQL w XAMPP i sprawdź, czy baza taskboard została utworzona.
2. W katalogu głównym projektu przygotuj lokalny plik .env na podstawie .env.example.
3. W folderze backend/ wykonaj npm install, a następnie npm start.
4. Otwórz aplikację pod adresem http://localhost:3000/ i utwórz konto testowe przez formularz rejestracji.
5. Zaimportuj docs/postman/TaskBoard-TB3.postman_collection.json do Postmana. Postman powinien zachowywać ciasteczko sesji między żądaniami.
6. Wykonaj najpierw Register albo Login, następnie Create board. Kolekcja zapisuje identyfikator utworzonej tablicy w zmiennej boardId.
7. Wykonaj żądania w folderze Tasks and filters. Żądanie Create task zapisuje identyfikator zadania w zmiennej taskId.
8. Żądanie Delete board znajduje się na końcu kolekcji, aby nie usuwać tablicy przed testami zadań.

Nie wpisuj haseł z lokalnego pliku .env do kolekcji ani do repozytorium. Po zakończeniu testów uzupełnij kolumnę Wynik rzeczywistymi rezultatami.
