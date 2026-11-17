# TaskBoard

TaskBoard to aplikacja do organizowania zadań zespołu. Użytkownik może założyć konto, zalogować się, tworzyć własne tablice, dodawać zadania, zmieniać ich status, przypisywać osoby i filtrować listę.

## Funkcje

- rejestracja i logowanie z hasłami haszowanymi przez bcrypt;
- sesja użytkownika i ochrona tras API;
- tworzenie, edycja i miękkie usuwanie tablic;
- widok Kanban: Do zrobienia, W trakcie, Gotowe;
- dodawanie, edycja, szczegóły, zmiana statusu i miękkie usuwanie zadań;
- filtry priorytetu, osoby przypisanej i fragmentu tytułu;
- responsywny interfejs Bootstrap 5.3 zgodny z makietami materialy/makieta/.

## Technologie

HTML, CSS, JavaScript, Bootstrap 5.3, Node.js, Express, express-session, bcryptjs, MySQL/MariaDB i Git.

## Struktura

- frontend/ – strony HTML, style i skrypty przeglądarki.
- backend/ – serwer Express, sesje, API i połączenie z bazą.
- database/ – skrypty SQL, dane testowe i kopie zapasowe.
- docs/ – dokumentacja API, testy, zadania i kolekcje Postman.
- materialy/ – makiety, diagram ERD i materiały pomocnicze.

## Uruchomienie lokalne (XAMPP)

1. Uruchom MySQL w XAMPP.
2. Zaimportuj database/taskboard.sql w phpMyAdmin. Uwaga: skrypt usuwa i odtwarza bazę taskboard; przed importem wykonaj kopię, jeśli chcesz zachować dane.
3. Skopiuj .env.example do .env w katalogu głównym. Ustaw dane MySQL zgodne z lokalną konfiguracją oraz własny długi SESSION_SECRET. Nie dodawaj .env do Git.
4. W terminalu przejdź do backend/ i wykonaj npm install.
5. Uruchom npm start.
6. Otwórz `http://localhost:3000/` i zarejestruj konto.

## Testy i dokumentacja

- docs/api.md – opis tras i przykładowe JSON.
- docs/testy.md – scenariusze testowe do wykonania.
- docs/postman/TaskBoard-TB3.postman_collection.json – kolekcja Postman dla etapu TB-3.
- W backend/ uruchom npm run check, aby sprawdzić składnię serwera i tras.

Testy ręczne, Lighthouse i walidację W3C należy wykonać lokalnie przed oddaniem. Nie są oznaczone jako zaliczone, dopóki nie zostaną faktycznie uruchomione.
