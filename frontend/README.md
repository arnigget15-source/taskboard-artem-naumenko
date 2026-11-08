# Frontend

Folder `frontend/` będzie zawierał kod odpowiedzialny za część aplikacji TaskBoard, którą użytkownik widzi w przeglądarce i z którą bezpośrednio pracuje. To tutaj zostaną przygotowane strony, formularze, przyciski, okna dialogowe, karty zadań, filtry oraz elementy nawigacji. Frontend ma przedstawiać dane w czytelny sposób i umożliwiać wykonywanie operacji bez konieczności kontaktowania się użytkownika bezpośrednio z bazą danych.

## Jakie elementy znajdą się w tym folderze?

W zależności od przyjętej organizacji kodu mogą tu zostać umieszczone:
- pliki HTML z podstawową strukturą poszczególnych widoków;
- pliki CSS odpowiadające za kolory, rozmieszczenie elementów, wygląd kart, formularzy i dostosowanie strony do różnych ekranów;
- skrypty JavaScript obsługujące przyciski, formularze, komunikaty, filtry i pobieranie danych;
- wspólne elementy interfejsu, takie jak nagłówek, menu, okna modalne i komunikaty o błędach;
- pliki graficzne i ikony wykorzystywane w interfejsie, jeśli będą potrzebne.

Przykładowo, osobne skrypty mogą w przyszłości obsługiwać logowanie, listę tablic i operacje na zadaniach. Ostateczny podział na pliki zostanie ustalony podczas implementacji.

## Planowane widoki aplikacji

Makiety znajdujące się w folderze `materialy/makieta/` pokazują, jak powinny wyglądać najważniejsze ekrany. Na ich podstawie frontend będzie rozwijany w następującej kolejności:

1. **Logowanie** – formularz, w którym użytkownik podaje dane dostępowe do swojego konta.
2. **Rejestracja** – formularz tworzenia konta z kontrolą poprawności wprowadzonych informacji.
3. **Lista tablic** – ekran pokazujący tablice użytkownika oraz umożliwiający przejście do wybranej tablicy.
4. **Tworzenie tablicy** – okno formularza, w którym można podać nazwę i opis nowej tablicy.
5. **Widok tablicy** – główny ekran pracy z zadaniami, pokazujący ich tytuły i aktualne statusy.
6. **Filtrowanie** – kontrolki pozwalające ograniczyć listę zadań, na przykład według statusu lub priorytetu.
7. **Dodawanie i edycja zadania** – formularz do wpisania tytułu, opisu, terminu, priorytetu i innych dostępnych informacji.
8. **Szczegóły zadania** – widok z pełnymi informacjami o wybranym zadaniu.
9. **Widok mobilny** – dostosowanie układu do mniejszych ekranów, aby podstawowe funkcje były wygodne również na telefonie.

## Zachowanie interfejsu

JavaScript będzie odpowiadać za reakcje strony na działania użytkownika. Przykładowo, po kliknięciu przycisku dodawania zadania powinien otworzyć się formularz. Po jego wypełnieniu frontend sprawdzi podstawowe wymagane pola i przekaże dane do backendu. Po otrzymaniu odpowiedzi wyświetli komunikat o powodzeniu albo informację o błędzie.

Walidacja po stronie przeglądarki ma ułatwiać wypełnianie formularzy, ale nie zastępuje sprawdzania danych po stronie serwera. Ostateczna decyzja o zapisaniu danych będzie należeć do backendu.

## Komunikacja z backendem

Frontend nie powinien łączyć się bezpośrednio z bazą danych. Będzie wysyłać żądania do backendu, na przykład z prośbą o pobranie tablic użytkownika, utworzenie nowego zadania albo zmianę jego statusu. Backend przetworzy żądanie i zwróci wynik, a frontend wykorzysta go do odświeżenia odpowiedniej części strony.

## Technologie

Do budowy tej części przewidziano HTML, CSS, JavaScript i Bootstrap. HTML posłuży do przygotowania struktury widoków, CSS do ich wyglądu, JavaScript do obsługi zachowania strony, a Bootstrap do tworzenia spójnego i responsywnego układu.

## Aktualny stan

Obecnie folder zawiera dokumentację przeznaczenia frontendu, natomiast właściwe pliki aplikacji będą dodawane w kolejnych etapach. Makiety ekranów można znaleźć w [materiałach projektu](../materialy/README.md).
