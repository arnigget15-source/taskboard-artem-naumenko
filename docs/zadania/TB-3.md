# Zadanie TB-3

## Część 1: frontend i integracja z API

- [x] Widok logowania i rejestracji w login.html.
- [x] Lista tablic w boards.html: lista, dodawanie, edycja i miękkie usuwanie.
- [x] Widok board.html z trzema kolumnami Kanban.
- [x] Modal zadania: dodawanie, edycja i szczegóły.
- [x] Zmiana statusu przyciskiem i usuwanie z potwierdzeniem.
- [x] Nagłówek z nazwą zalogowanej osoby i przyciskiem Wyloguj.
- [x] Ochrona tras API przez sesję; odpowiedź 401 dla niezalogowanych.
- [x] Bootstrap 5.3, własny css/style.css i układ responsywny według materialy/makieta/.

## Część 2: filtry, walidacja i oddanie

- [x] Filtr priority.
- [x] Filtr assigneeId (dodatnia liczba całkowita; błędna wartość zwraca 400).
- [x] Wyszukiwanie q w tytule przez LIKE.
- [x] Łączenie filtrów priority, assigneeId i q.
- [x] Walidacja formularzy po stronie przeglądarki i serwera.
- [x] Dokumentacja tras w docs/api.md.
- [ ] Co najmniej 10 scenariuszy w docs/testy.md wykonano i wpisano rzeczywiste wyniki (obecnie oczekują na lokalne wykonanie).
- [x] Instrukcja uruchomienia w README.md.

## Przed oddaniem

- [ ] Uruchomić projekt lokalnie na XAMPP i sprawdzić wszystkie scenariusze T-01–T-30 z docs/testy.md; wpisać rzeczywiste wyniki.
- [ ] Wykonać Lighthouse i potwierdzić wynik co najmniej 90.
- [ ] Sprawdzić wszystkie pliki HTML w walidatorze W3C.
- [ ] Potwierdzić zielony workflow GitHub Actions.
- [ ] Po scaleniu do main utworzyć i wypchnąć tag v1.0.

Wyniki testów, Lighthouse i W3C należy wpisać dopiero po rzeczywistym wykonaniu. Lista zadań nie oznacza, że lokalne środowisko zostało już przetestowane.
