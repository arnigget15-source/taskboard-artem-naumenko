# Frontend

W folderze `frontend/` będzie znajdować się część strony, którą widzi użytkownik. Będą tu pliki odpowiedzialne za wygląd strony i jej obsługę.

## Co będzie tutaj potrzebne?

- pliki HTML – będą tworzyć układ strony;
- pliki CSS – będą odpowiadać za kolory, rozmiary i rozmieszczenie elementów;
- pliki JavaScript – będą obsługiwać przyciski, formularze i filtry;
- obrazy i ikony – jeśli będą potrzebne w wyglądzie strony.

## Jakie strony planuję zrobić?

Na podstawie makiet z folderu `materialy/makieta/` frontend będzie zawierał:

1. **Logowanie** – formularz do wejścia na konto.
2. **Rejestrację** – formularz do założenia konta.
3. **Listę tablic** – miejsce, w którym będą widoczne tablice użytkownika.
4. **Tworzenie tablicy** – formularz z nazwą i opisem.
5. **Widok tablicy** – lista zadań przypisanych do danej tablicy.
6. **Filtrowanie** – możliwość znalezienia zadań według wybranych informacji.
7. **Dodawanie i edycję zadań** – formularz z tytułem, opisem, statusem i terminem.
8. **Szczegóły zadania** – więcej informacji o wybranym zadaniu.
9. **Wersję na telefon** – żeby strona dobrze wyglądała również na mniejszym ekranie.

## Jak będzie działać frontend?

Po kliknięciu przycisku strona będzie reagować na działanie użytkownika. Na przykład po wybraniu opcji dodania zadania pokaże się formularz. Po jego wypełnieniu dane zostaną wysłane do backendu.

Frontend będzie też wyświetlał informacje zwrotne, na przykład czy zadanie zostało dodane, albo czy trzeba poprawić jakieś pole.

## Połączenie z backendem

Frontend nie będzie łączyć się bezpośrednio z bazą danych. Będzie wysyłać dane do backendu, a ten zajmie się ich sprawdzeniem i zapisaniem.

## Aktualny stan

Na razie w tym folderze znajduje się opis planowanego frontendu. Pliki HTML, CSS i JavaScript zostaną dodane podczas tworzenia strony.
