# TaskBoard

TaskBoard to aplikacja do organizowania zadań zespołu. Użytkownik może założyć konto, zalogować się, tworzyć własne tablice, dodawać zadania, zmieniać ich status, przypisywać osoby i filtrować listę.

## Funkcje

- Rejestracja i logowanie z hasłami haszowanymi przez bcrypt.
- Sesja użytkownika i ochrona tras API.
- Tworzenie, edycja i miękkie usuwanie tablic i zadań.
- Widok Kanban: Do zrobienia, W trakcie, Gotowe.
- Łączenie filtrów priorytetu, osoby przypisanej i fragmentu tytułu.
- Walidacja formularzy w przeglądarce i API.
- Responsywny interfejs Bootstrap 5.3.

## Technologie

HTML, CSS, JavaScript, Bootstrap 5.3, Node.js 18+, Express, express-session, bcryptjs, MySQL/MariaDB i Git.

## Struktura

- frontend/ – strony HTML, style i skrypty przeglądarki.
- backend/ – serwer Express, sesje, API i połączenie z bazą.
- database/ – skrypty SQL, dane testowe i konta MySQL.
- docs/ – dokumentacja API, testy i kolekcje Postman.
- materialy/ – makiety, diagram ERD i materiały pomocnicze.

## Uruchomienie z czystego klonu (Windows + XAMPP)

1. Zainstaluj Node.js 18 lub nowszy, Git i XAMPP.
2. Sklonuj repozytorium: git clone https://github.com/arnigget15-source/taskboard-artem-naumenko.git
3. Przejdź do katalogu taskboard-artem-naumenko.
4. Uruchom MySQL w XAMPP Control Panel.
5. Otwórz phpMyAdmin (http://localhost/phpmyadmin) i zaimportuj database/taskboard.sql.

   UWAGA: skrypt usuwa i odtwarza całą bazę taskboard. Przed importem istniejącej bazy wykonaj kopię zapasową.

6. W database/konta.sql zastąp hasła CHANGE_ME... własnymi hasłami. Wykonaj skrypt w phpMyAdmin jako administrator MySQL. Konto taskboard_app ma tylko SELECT, INSERT i UPDATE — bez DELETE. Zapisz jego hasło do .env jako DB_PASSWORD.
7. Opcjonalnie zaimportuj database/users_seed.sql, aby dodać przykładowych użytkowników aplikacji. To konta TaskBoard, a nie konta MySQL.
8. Skopiuj .env.example do .env w katalogu głównym projektu (PowerShell: Copy-Item .env.example .env).
9. Otwórz .env i wpisz hasło taskboard_app w DB_PASSWORD. Ustaw też długą losową wartość SESSION_SECRET. Nie udostępniaj .env i nie dodawaj go do Git.
10. W terminalu przejdź do backend/ i wykonaj npm install, następnie npm run check i npm start.
11. Otwórz http://localhost:3000/ i wybierz Rejestracja.

Każdy użytkownik rejestruje się w TaskBoard samodzielnie — osobne konto MySQL dla każdego nie jest potrzebne. Aplikacja działa lokalnie, dopóki uruchomione są MySQL i proces Node.js.

## Testy i dokumentacja

- docs/api.md – opis tras, parametrów i odpowiedzi API.
- docs/testy.md – scenariusze testowe i checklista walidacji.
- docs/postman/TaskBoard-TB3.postman_collection.json – kolekcja Postman dla TB-3.
- W folderze backend/ polecenie npm run check sprawdza składnię serwera i tras.

Testy ręczne, Lighthouse Accessibility i walidację W3C należy wykonać lokalnie przed oddaniem. Nie oznaczaj ich jako zaliczone, dopóki nie zostały faktycznie uruchomione.
