# Materiały do projektu

Folder `materialy/` zawiera pliki pomocnicze wykorzystywane podczas planowania i realizacji aplikacji TaskBoard. Nie są to główne pliki kodu strony. Ich zadaniem jest pokazanie, jak aplikacja ma wyglądać, jakie dane powinna przechowywać i na jakich przykładach można sprawdzać poszczególne rozwiązania.

Materiały pomagają zachować zgodność pomiędzy wymaganiami, wyglądem interfejsu, logiką backendu i strukturą bazy danych.

## Zawartość folderu

| Plik lub folder | Do czego służy |
| --- | --- |
| [`dane-szablon.md`](dane-szablon.md) | Szablon dokumentu, w którym można opisać, jakie informacje przechowuje aplikacja i jak są one ze sobą powiązane. |
| [`erd.md`](erd.md) | Diagram ERD przedstawiający tabele użytkowników, tablic i zadań, ich pola oraz relacje. |
| [`users.csv`](users.csv) | Przykładowe dane użytkowników wykorzystywane podczas ćwiczeń z importowania i testowania danych. |
| [`makieta/`](makieta/) | Obrazy przedstawiające planowany wygląd ekranów aplikacji. |
| [`bugs/`](bugs/) | Mała strona demonstracyjna z celowo umieszczonymi błędami JavaScript, przeznaczona do ćwiczenia debugowania. |

## Makiety interfejsu

Folder `makieta/` zawiera obrazy pokazujące poszczególne etapy korzystania z aplikacji. Można tam znaleźć ekran logowania, formularz rejestracji, listę tablic, okno tworzenia nowej tablicy, widok tablicy, filtry, formularz zadania, szczegóły zadania oraz wersję przeznaczoną na telefon.

Makiety są punktem odniesienia podczas przygotowywania frontendu. Dzięki nim można wcześniej zobaczyć, jakie elementy powinny znaleźć się na stronie i jak użytkownik będzie przechodzić pomiędzy widokami.

## Diagram ERD i opis danych

Plik `erd.md` przedstawia planowaną strukturę bazy danych. Pokazuje trzy główne tabele: `users`, `boards` i `tasks`, a także sposób ich łączenia. Diagram będzie pomocny podczas tworzenia skryptów SQL oraz przy implementacji operacji po stronie backendu.

Plik `dane-szablon.md` pomaga opisać te informacje zwykłym językiem, zanim zostaną one odwzorowane w tabelach bazy danych. Można go skopiować do dokumentacji i uzupełnić zgodnie z wymaganiami zadania.

## Dane testowe

Plik `users.csv` zawiera przykładowe rekordy użytkowników. Może zostać wykorzystany do przećwiczenia importowania danych do bazy i sprawdzenia, czy aplikacja poprawnie odczytuje zapisane informacje. Są to dane przeznaczone wyłącznie do środowiska testowego, a nie prawdziwe konta.

## Ćwiczenie z debugowania

W folderze `bugs/` znajduje się prosty plik HTML i skrypt JavaScript. Strona wyświetla zadanie polegające na policzeniu wykonanych elementów. W skrypcie umieszczono celowe błędy, które należy odnaleźć za pomocą narzędzi deweloperskich przeglądarki (DevTools). Ćwiczenie pozwala przećwiczyć korzystanie z konsoli, breakpointów i podglądu wartości zmiennych.

## Jak korzystać z materiałów?

Przed rozpoczęciem danego etapu warto sprawdzić, czy w tym folderze znajduje się odpowiednia makieta, diagram lub przykładowy plik. Oryginalne materiały najlepiej pozostawić bez zmian, a własne opisy i wyniki pracy zapisywać w odpowiednich folderach projektu, na przykład w `docs/`.

Szczegółowe opisy kolejnych etapów znajdują się w [dokumentacji zadań](../docs/zadania/README.md).
