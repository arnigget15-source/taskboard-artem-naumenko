# Baza danych

Folder `database/` jest przeznaczony na pliki związane z bazą danych aplikacji TaskBoard. Baza będzie przechowywać informacje o użytkownikach, utworzonych przez nich tablicach oraz zadaniach przypisanych do poszczególnych tablic.

## Główne tabele

W projekcie zaplanowano trzy podstawowe tabele:

| Tabela | Przechowywane informacje |
| --- | --- |
| `users` | Dane kont użytkowników, dane wyświetlane w aplikacji oraz skróty haseł. |
| `boards` | Nazwy i opisy tablic, ich właściciele oraz informacje o utworzeniu i usunięciu. |
| `tasks` | Tytuły i opisy zadań, statusy, priorytety, terminy oraz przypisania do tablic i użytkowników. |

## Relacje między danymi

Jeden użytkownik może utworzyć wiele tablic. Każda tablica należy do jednego właściciela i może zawierać wiele zadań. Zadanie jest przypisane do jednej tablicy, natomiast przypisanie konkretnego użytkownika do zadania jest opcjonalne.

Pełny opis pól, kluczy głównych i obcych znajduje się w [diagramie ERD](../materialy/erd.md).

## Zasady przechowywania danych

Nazwy tabel są zapisywane małymi literami, a nazwy pól w konwencji `camelCase`. W projekcie przewidziano również mechanizm *soft delete*. Oznacza to, że usunięcie tablicy lub zadania będzie oznaczać ustawienie informacji o usunięciu, zamiast natychmiastowego kasowania rekordu z bazy.

Hasła użytkowników powinny być przechowywane wyłącznie jako bezpieczne skróty, a nie jako zwykły tekst.

## Materiały i dalsze prace

- [Diagram ERD](../materialy/erd.md) przedstawia strukturę tabel i ich powiązania.
- [Przykładowi użytkownicy](../materialy/README.md) oraz plik `users.csv` służą do ćwiczeń z danymi testowymi.
- Skrypty tworzące tabele i wypełniające je danymi zostaną umieszczone w tym folderze podczas kolejnych etapów projektu.

## Aktualny stan

Na obecnym etapie struktura bazy jest opisana w materiale ERD. Konkretne skrypty SQL i instrukcja konfiguracji zostaną dodane po rozpoczęciu pracy nad bazą danych.
