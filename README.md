# TaskBoard

TaskBoard to strona, która ma pomagać w organizowaniu zadań. Użytkownik będzie mógł tworzyć tablice, dodawać do nich zadania i sprawdzać, co jest już zrobione, a co jeszcze trzeba wykonać.

Projekt jest na razie w trakcie przygotowania. W repozytorium znajdują się dokumentacja, makiety strony i opis bazy danych. Sam kod aplikacji będzie dodawany później.

## Co będzie można zrobić na stronie?

- założyć konto i zalogować się;
- tworzyć własne tablice;
- dodawać zadania do tablic;
- edytować i usuwać zadania;
- zmieniać status zadania;
- ustawiać priorytet i termin;
- przypisywać zadania do użytkowników;
- wyszukiwać i filtrować zadania.

To jest plan funkcji, a nie gotowa lista działających opcji.

## Technologie

W projekcie planuję wykorzystać:
- **HTML** – do stworzenia struktury strony;
- **CSS** – do wyglądu strony;
- **JavaScript** – do obsługi przycisków, formularzy i innych działań;
- **Bootstrap** – do łatwiejszego układania elementów strony;
- **SQL** – do pracy z bazą danych;
- **Git i GitHub** – do zapisywania zmian w projekcie.

## Co znajduje się w folderach?

- `frontend/` – tutaj będzie kod strony widocznej dla użytkownika, czyli widoki, formularze, style i skrypty.
- `backend/` – tutaj będzie część serwerowa, która będzie sprawdzać dane i obsługiwać działania użytkownika.
- `database/` – tutaj będą pliki związane z bazą danych, na przykład skrypty SQL i tabele.
- `docs/` – dokumentacja i opisy zadań.
- `materialy/` – makiety strony, diagram bazy danych i pliki pomocnicze.
- `.github/` – ustawienia i automatyczne sprawdzanie plików na GitHubie.

## Jak będą działać te części?

Użytkownik będzie korzystać ze strony przez frontend. Kiedy na przykład doda zadanie, frontend wyśle dane do backendu. Backend sprawdzi je i zapisze w bazie danych. Potem odeśle odpowiedź, a strona pokaże zaktualizowane informacje.

## Aktualny stan projektu

Na ten moment przygotowana jest głównie dokumentacja i plan wyglądu strony. Frontend, backend i skrypty bazy danych będą uzupełniane w kolejnych etapach.

## Przydatne pliki

- [Frontend](frontend/README.md)
- [Backend](backend/README.md)
- [Baza danych](database/README.md)
- [Dokumentacja](docs/README.md)
- [Materiały](materialy/README.md)
- [Diagram ERD](materialy/erd.md)
