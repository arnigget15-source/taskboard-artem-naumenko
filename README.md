# TaskBoard

TaskBoard to aplikacja do organizowania pracy w formie tablic i zadań. Użytkownik może tworzyć własne tablice, dodawać do nich zadania, określać ich status i priorytet oraz przypisywać je do wybranych osób. Projekt jest rozwijany etapami w ramach ćwiczeń programistycznych.

## Główne funkcje

Docelowo aplikacja będzie umożliwiać:
- rejestrację i logowanie użytkowników;
- tworzenie oraz przeglądanie tablic;
- dodawanie, edytowanie i oznaczanie zadań jako wykonane;
- ustawianie statusu, priorytetu i terminu zadania;
- przypisywanie zadań do użytkowników;
- filtrowanie zadań według wybranych kryteriów.

## Technologie i narzędzia

W projekcie wykorzystywane są lub planowane są następujące technologie:
- **HTML, CSS i JavaScript** – przygotowanie struktury i zachowania interfejsu;
- **Bootstrap** – budowanie responsywnego układu strony i elementów formularzy;
- **SQL** – definiowanie struktury bazy danych i praca z zapisanymi informacjami;
- **Git i GitHub** – kontrola wersji, praca na gałęziach oraz przegląd zmian przez Pull Request;
- **Visual Studio Code** – edycja plików projektu;
- **DevTools i Postman** – sprawdzanie działania strony oraz testowanie komunikacji z aplikacją.

Szczegółowy wybór technologii po stronie serwera będzie opisany w dokumentacji backendu, gdy zostanie ustalony w kolejnych etapach.

## Wymagane środowisko

Do pracy z repozytorium potrzebne są:
- komputer z systemem Windows, Linux lub macOS;
- Git;
- Visual Studio Code lub inny edytor kodu;
- przeglądarka internetowa z narzędziami deweloperskimi;
- środowisko bazy danych obsługujące SQL, gdy rozpoczną się prace nad bazą.

Dodatkowe wymagania, takie jak wersja środowiska serwerowego lub sposób instalacji zależności, zostaną dopisane wraz z implementacją tych części aplikacji.

## Uruchomienie

Na obecnym etapie repozytorium zawiera strukturę projektu, materiały i dokumentację zadania. Pełna instrukcja uruchomienia aplikacji zostanie uzupełniona po przygotowaniu frontendowej i backendowej części systemu.

Aby pobrać repozytorium na komputer:

```bash
git clone <adres-repozytorium>
cd taskboard-artem-naumenko
```

Następnie otwórz folder projektu w Visual Studio Code. Do przeglądania materiałów i dokumentacji nie jest potrzebna dodatkowa instalacja.

## Struktura projektu

| Folder lub plik | Zastosowanie |
| --- | --- |
| `frontend/` | Pliki interfejsu użytkownika, widoki, formularze i style. |
| `backend/` | Logika po stronie serwera oraz obsługa żądań aplikacji. |
| `database/` | Skrypty SQL i elementy związane ze strukturą bazy danych. |
| `docs/` | Dokumentacja projektu oraz opisy kolejnych zadań. |
| `materialy/` | Materiały wejściowe: diagram ERD, przykładowe dane i makiety. |
| `.github/` | Konfiguracja automatycznych kontroli repozytorium. |

## Dokumentacja i materiały

- [Dokumentacja zadań](docs/zadania/README.md)
- [Materiały do projektu](materialy/README.md)
- [Opis struktury danych](materialy/erd.md)

## Autor

**Autor:** [uzupełnij imię i nazwisko]  
**Klasa:** [uzupełnij klasę]
