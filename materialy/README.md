# Materiały do projektu

W tym folderze znajdują się pliki pomocnicze przekazane do realizacji projektu TaskBoard. Zawierają przykładowe dane, opis struktury bazy, makiety interfejsu oraz materiały do ćwiczeń. Warto traktować je jako punkt odniesienia podczas wykonywania zadań i nie modyfikować oryginałów bez wyraźnej potrzeby.

## Zawartość folderu

| Plik lub folder | Zastosowanie |
| --- | --- |
| [`dane-szablon.md`](dane-szablon.md) | Szablon opisu informacji przechowywanych przez aplikację. Można go skopiować do dokumentacji i uzupełnić własnymi obserwacjami. |
| [`erd.md`](erd.md) | Diagram ERD przedstawiający tabele, pola i relacje między użytkownikami, tablicami oraz zadaniami. |
| [`users.csv`](users.csv) | Przykładowy zestaw użytkowników do ćwiczeń z importowaniem danych. Dane logowania należy wykorzystywać wyłącznie w środowisku testowym. |
| [`makieta/`](makieta/) | Zrzuty ekranów pokazujące planowany wygląd poszczególnych widoków aplikacji. |
| [`bugs/`](bugs/) | Mały projekt demonstracyjny do ćwiczenia wyszukiwania błędów za pomocą narzędzi deweloperskich przeglądarki. |

## Makiety interfejsu

W folderze `makieta/` znajdują się obrazy przedstawiające między innymi ekran logowania, formularz rejestracji, listę tablic, formularz nowej tablicy, widok tablicy, filtry i szczegóły zadania. Przygotowując frontend, warto porównywać własne widoki z tymi przykładami.

## Diagram i przykładowe dane

Plik `erd.md` opisuje zależności między głównymi elementami systemu. Na jego podstawie można przygotować tabele i klucze w bazie danych. Plik `users.csv` służy do testów importu, dlatego nie należy używać zawartych w nim danych jako prawdziwych kont.

## Rozpoczęcie pracy z repozytorium

Jeżeli repozytorium zostało udostępnione jako szablon, można utworzyć jego własną kopię przez opcję **Use this template** na GitHubie. Następnie należy sklonować utworzone repozytorium i otworzyć folder w edytorze, na przykład Visual Studio Code.

Przykładowe polecenia:

```bash
git clone <adres-repozytorium>
cd <nazwa-folderu>
```

Szczegółowe wymagania dotyczące kolejnych etapów znajdują się w [dokumentacji zadań](../docs/zadania/README.md).
