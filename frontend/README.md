# Frontend

Frontend TaskBoard znajduje się w tym folderze. Zawiera trzy widoki: logowanie i rejestrację (login.html), listę tablic (boards.html) oraz tablicę Kanban (board.html).

## Technologie i wygląd

Widoki korzystają z Bootstrap 5.3 oraz własnego css/style.css. Układ, kolory, formularze, karty, modale, filtry i responsywne kolumny odwzorowują makiety z materialy/makieta/. Na szerokim ekranie zadania są pokazane w trzech kolumnach, a na telefonie kolumny układają się jedna pod drugą.

## JavaScript

- js/api.js – wspólna funkcja api(), obsługa błędów 401, komunikaty i nagłówek sesji.
- js/login.js – logowanie, rejestracja i walidacja formularzy.
- js/boards.js – lista, tworzenie, edycja i miękkie usuwanie tablic.
- js/board.js – zadania, filtry priority/assigneeId/q, modal, zmiana statusu i usuwanie.

Tekst pochodzący z API jest wstawiany przez textContent lub createTextNode, a nie przez niebezpieczne składanie HTML.

## Uruchomienie

Frontend jest serwowany przez Express. Uruchom backend zgodnie z instrukcją w backend/README.md, a następnie otwórz `http://localhost:3000/`.
