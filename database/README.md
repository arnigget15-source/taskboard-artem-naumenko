# Baza danych

Folder `database/` będzie przeznaczony na pliki związane z tworzeniem i obsługą bazy danych aplikacji TaskBoard. Baza będzie przechowywać informacje potrzebne do działania systemu: konta użytkowników, utworzone tablice oraz zadania znajdujące się na tych tablicach. Dzięki niej dane nie będą znikać po zamknięciu przeglądarki i będzie można pobierać je ponownie podczas kolejnych sesji.

## Jakie informacje będą przechowywane?

Zgodnie z diagramem ERD projekt opiera się na trzech podstawowych tabelach:

| Tabela | Zawartość |
| --- | --- |
| `users` | Konta użytkowników: identyfikator, login, skrót hasła, imię, nazwisko i data utworzenia konta. |
| `boards` | Tablice: nazwa, opis, identyfikator właściciela, data utworzenia oraz informacje o ewentualnym usunięciu. |
| `tasks` | Zadania: tytuł, opis, status, priorytet, termin, identyfikator tablicy, opcjonalnie przypisany użytkownik i informacje o utworzeniu lub usunięciu. |

## Relacje między tabelami

Tabele są ze sobą powiązane za pomocą kluczy głównych i obcych:
- jeden użytkownik może utworzyć kilka tablic;
- każda tablica ma jednego właściciela;
- jedna tablica może zawierać wiele zadań;
- każde zadanie należy do konkretnej tablicy;
- zadanie może, ale nie musi, mieć przypisanego użytkownika odpowiedzialnego za jego wykonanie.

Takie powiązania pozwolą na przykład pobrać wszystkie tablice danego użytkownika albo wyświetlić zadania znajdujące się na wybranej tablicy. Szczegółowy układ pól i relacji przedstawia [diagram ERD](../materialy/erd.md).

## Jakie pliki będą znajdować się w folderze?

W trakcie tworzenia bazy mogą zostać dodane skrypty SQL, na przykład:
- skrypt tworzący tabele i ich kolumny;
- definicje kluczy głównych, obcych i ograniczeń;
- skrypt dodający przykładowe dane testowe;
- ewentualne kolejne skrypty aktualizujące strukturę bazy.

Nazwy i podział tych plików zostaną ustalone podczas realizacji części bazodanowej. README nie oznacza, że wszystkie wymienione skrypty już istnieją.

## Zasady przechowywania danych

Nazwy tabel w diagramie zapisano małymi literami, a nazwy pól w konwencji `camelCase`. Pola takie jak `ownerId`, `boardId` i `assigneeId` służą do łączenia rekordów z odpowiednimi użytkownikami lub tablicami.

W projekcie przewidziano również mechanizm *soft delete*. Po usunięciu tablicy lub zadania rekord nie musi być od razu kasowany z bazy. Zamiast tego ustawiane są pola `isDeleted`, `deletedAt` i `deletedById`. Dzięki temu aplikacja może ukrywać usunięte elementy, zachowując informację o tym, kiedy i przez kogo zostały usunięte.

Hasła użytkowników będą przechowywane w postaci skrótów, a nie zwykłego tekstu. Przykładowe dane z pliku CSV służą wyłącznie do ćwiczeń i testów.

## Aktualny stan

Na obecnym etapie struktura danych jest opisana w pliku [`materialy/erd.md`](../materialy/erd.md). W folderze `database/` nie ma jeszcze gotowych skryptów tworzących bazę. Zostaną one dodane w trakcie kolejnego etapu projektu.
