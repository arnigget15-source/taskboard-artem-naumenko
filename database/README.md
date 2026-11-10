# Baza danych

Folder `database/` będzie służył do przechowywania plików związanych z bazą danych TaskBoard. Będą w niej zapisane informacje o użytkownikach, tablicach i zadaniach.

## Jakie tabele będą potrzebne?

Według przygotowanego diagramu ERD baza będzie miała trzy główne tabele:

| Tabela | Co będzie przechowywać? |
| --- | --- |
| `users` | Dane użytkowników, na przykład login i skrót hasła. |
| `boards` | Nazwy i opisy tablic oraz informację, kto je utworzył. |
| `tasks` | Zadania, ich opisy, statusy, priorytety i terminy. |

## Jak tabele będą połączone?

- Jeden użytkownik będzie mógł mieć kilka tablic.
- Każda tablica będzie miała swojego właściciela.
- W jednej tablicy będzie można umieścić wiele zadań.
- Zadanie będzie należeć do jednej tablicy.
- Zadanie będzie można przypisać do wybranego użytkownika.

Dokładny wygląd tabel i połączeń można zobaczyć w pliku [erd.md](../materialy/erd.md).

## Jakie pliki znajdą się w tym folderze?

W przyszłości będą tu na przykład:

- pliki SQL tworzące tabele;
- ustawienia kluczy i połączeń między tabelami;
- przykładowe dane do testowania bazy.

## Dodatkowe informacje

W diagramie przewidziano też pola takie jak `isDeleted`, `deletedAt` i `deletedById`. Mają one pozwolić na oznaczenie usuniętych elementów bez natychmiastowego kasowania ich z bazy.

Hasła użytkowników będą przechowywane w postaci skrótów, a nie zwykłego tekstu.

## Aktualny stan

Na razie struktura bazy jest opisana w diagramie ERD. Gotowe skrypty SQL zostaną dodane później.
