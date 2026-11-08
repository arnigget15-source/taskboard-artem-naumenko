# Frontend

Folder `frontend/` jest przeznaczony na część aplikacji TaskBoard widoczną bezpośrednio dla użytkownika. Znajdą się tu widoki, formularze, elementy nawigacji oraz style odpowiedzialne za wygląd i wygodę korzystania z aplikacji.

## Główne widoki

Zgodnie z przygotowanymi makietami interfejs powinien obejmować:
- ekran logowania i formularz rejestracji;
- widok listy tablic użytkownika;
- formularz tworzenia nowej tablicy;
- widok wybranej tablicy z listą zadań;
- formularz dodawania i edycji zadania;
- szczegóły zadania oraz dostępne filtry.

## Technologie

Do przygotowania interfejsu przewidziano HTML, CSS i JavaScript. Bootstrap będzie wykorzystywany do budowania układu strony, formularzy, przycisków i innych elementów interfejsu. Widoki powinny być czytelne zarówno na komputerze, jak i na urządzeniach mobilnych.

## Komunikacja z backendem

Frontend będzie odpowiadać za zebranie danych wprowadzonych przez użytkownika i przekazanie ich do części serwerowej. Otrzymane odpowiedzi posłużą do aktualizacji widoków, wyświetlania komunikatów oraz prezentowania danych o tablicach i zadaniach.

Walidacja po stronie interfejsu może pomagać użytkownikowi poprawnie wypełnić formularz, ale ostateczna kontrola poprawności danych powinna odbywać się również po stronie backendu.

## Materiały projektowe

Makiety ekranów znajdują się w folderze [`materialy/makieta/`](../materialy/README.md). Pokazują one między innymi logowanie, rejestrację, listę tablic, widok tablicy, filtry oraz szczegóły zadania.

## Aktualny stan

Folder opisuje przeznaczenie części frontendowej. Szczegółowa instrukcja uruchomienia i lista plików zostaną dodane wraz z implementacją interfejsu.
