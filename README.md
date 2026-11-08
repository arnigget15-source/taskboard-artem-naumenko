# TaskBoard

TaskBoard to aplikacja internetowa służąca do planowania pracy i kontrolowania postępów zadań. Jej głównym elementem są tablice, na których można grupować zadania związane z konkretnym projektem lub obszarem pracy. Użytkownik powinien móc sprawdzić, co jest do zrobienia, nad czym aktualnie ktoś pracuje i które zadania zostały już zakończone.

Projekt jest przygotowywany etapami. Obecne repozytorium zawiera strukturę folderów, dokumentację, diagram bazy danych oraz makiety pokazujące planowany wygląd aplikacji. Kod poszczególnych części będzie uzupełniany w kolejnych etapach.

## Cel i planowane możliwości aplikacji

TaskBoard ma ułatwiać organizację pracy bez konieczności przechowywania list zadań w wielu osobnych plikach. Informacje będą uporządkowane w tablice, a każda tablica będzie zawierać przypisane do niej zadania.

Na podstawie przygotowanych makiet i struktury danych aplikacja ma obejmować:
- rejestrację nowych użytkowników i logowanie do konta;
- wyświetlanie listy tablic należących do zalogowanego użytkownika;
- tworzenie nowych tablic oraz podawanie ich nazw i opisów;
- otwieranie tablicy i przeglądanie znajdujących się w niej zadań;
- dodawanie nowych zadań, wyświetlanie ich szczegółów i edytowanie;
- ustawianie statusu zadania: do zrobienia, w trakcie lub wykonane;
- określanie priorytetu i opcjonalnego terminu wykonania;
- przypisywanie zadania do użytkownika;
- filtrowanie zadań, aby łatwiej odnaleźć potrzebne informacje.

Są to założenia projektu wynikające z dokumentacji i makiet. Nie wszystkie wymienione funkcje są już zaimplementowane.

## Technologie i narzędzia

W projekcie przewidziano wykorzystanie następujących technologii i narzędzi:
- **HTML** – tworzenie struktury stron, formularzy, przycisków i widoków;
- **CSS** – określanie wyglądu elementów, odstępów, kolorów i układu strony;
- **JavaScript** – obsługa interakcji, formularzy, filtrów i aktualizacji widoków;
- **Bootstrap** – pomoc przy budowaniu responsywnego interfejsu i gotowych elementów strony;
- **SQL** – tworzenie tabel, relacji i wykonywanie operacji na danych;
- **Git i GitHub** – zapisywanie zmian, praca na gałęziach i przegląd kodu przez Pull Request;
- **Visual Studio Code** – edycja i organizacja plików projektu;
- **DevTools i Postman** – sprawdzanie działania interfejsu oraz testowanie komunikacji z backendem.

Dokładne rozwiązania po stronie serwera i sposób połączenia z bazą zostaną opisane po ich ustaleniu i wdrożeniu.

## Struktura repozytorium

| Folder lub plik | Przeznaczenie |
| --- | --- |
| `frontend/` | Kod części widocznej dla użytkownika: strony, formularze, style i skrypty JavaScript. |
| `backend/` | Część serwerowa: logika aplikacji, sprawdzanie danych i obsługa żądań z frontendu. |
| `database/` | Skrypty SQL, definicje tabel, relacje i przykładowe dane bazy. |
| `docs/` | Dokumentacja techniczna, opisy wymagań i zadania realizowane podczas pracy nad projektem. |
| `materialy/` | Materiały pomocnicze: makiety ekranów, diagram ERD, szablony i dane testowe. |
| `.github/` | Skrypty i konfiguracja automatycznych kontroli repozytorium uruchamianych przez GitHub Actions. |
| `.gitignore` | Lista plików i folderów, których nie należy dodawać do repozytorium. |

## Jak będą współpracować części aplikacji?

Frontend będzie odpowiadać za to, co widzi i obsługuje użytkownik. Po wykonaniu czynności, na przykład dodaniu zadania, przekaże odpowiednie dane do backendu. Backend sprawdzi otrzymane informacje, wykona wymaganą operację i w razie potrzeby zapisze zmiany w bazie danych. Następnie zwróci odpowiedź, na podstawie której frontend zaktualizuje widok.

Baza danych będzie przechowywać konta użytkowników, tablice i zadania. Dokumentacja w folderze `docs/` oraz materiały w `materialy/` będą pomagać zachować zgodność pomiędzy wyglądem aplikacji, logiką działania i strukturą danych.

## Uruchomienie projektu

Na obecnym etapie repozytorium zawiera przede wszystkim dokumentację i materiały projektowe. Nie ma jeszcze kompletnej implementacji frontendu i backendu, dlatego pełna instrukcja uruchomienia strony zostanie dodana po przygotowaniu kodu oraz konfiguracji wymaganych narzędzi.

Aby pobrać repozytorium na komputer, użyj poleceń:

```bash
git clone <adres-repozytorium>
cd taskboard-artem-naumenko
```

Następnie otwórz folder w Visual Studio Code. Dokumentację i makiety można przeglądać bez uruchamiania aplikacji.

## Dokumentacja i materiały

- [Opis frontendu](frontend/README.md)
- [Opis backendu](backend/README.md)
- [Opis bazy danych](database/README.md)
- [Dokumentacja projektu](docs/README.md)
- [Materiały pomocnicze](materialy/README.md)
- [Diagram ERD](materialy/erd.md)

## Autor

**Autor:** [uzupełnij imię i nazwisko]  
**Klasa:** [uzupełnij klasę]
