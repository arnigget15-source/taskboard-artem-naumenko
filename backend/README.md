# Backend

Folder `backend/` jest przeznaczony na część serwerową aplikacji TaskBoard. To tutaj będzie znajdować się logika odpowiedzialna za przetwarzanie danych, obsługę żądań wysyłanych z interfejsu oraz komunikację z bazą danych.

## Zakres odpowiedzialności

Backend będzie odpowiadać przede wszystkim za:
- obsługę rejestracji i logowania użytkowników;
- sprawdzanie poprawności danych otrzymanych z formularzy;
- udostępnianie operacji związanych z tablicami i zadaniami;
- kontrolowanie dostępu do danych użytkowników;
- zapisywanie i odczytywanie informacji z bazy danych;
- zwracanie odpowiedzi, które frontend będzie mógł wyświetlić użytkownikowi.

## Dane obsługiwane przez backend

Podstawowe obiekty aplikacji to użytkownicy, tablice i zadania. Użytkownik może tworzyć tablice, tablica zawiera zadania, a zadanie może mieć przypisaną osobę odpowiedzialną. Szczegółowe pola i relacje zostały opisane w [diagramie ERD](../materialy/erd.md).

Hasła użytkowników nie powinny być przechowywane w postaci zwykłego tekstu. W strukturze danych przewidziano pole `passwordHash`, w którym ma być zapisywany skrót hasła.

## Powiązanie z frontendem i bazą danych

Frontend będzie wysyłać do backendu żądania dotyczące operacji wykonywanych w aplikacji. Backend zweryfikuje dane, wykona odpowiednie działanie i w razie potrzeby skorzysta z bazy danych. Wynik operacji zostanie przekazany z powrotem do interfejsu.

## Aktualny stan

Na obecnym etapie folder zawiera dokumentację przeznaczenia części serwerowej. Kod backendu, wybrany framework oraz dokładny sposób uruchamiania zostaną opisane po rozpoczęciu implementacji.

## Powiązane części projektu

- [Frontend](../frontend/README.md) – interfejs użytkownika.
- [Baza danych](../database/README.md) – przechowywanie danych aplikacji.
- [Główna dokumentacja](../README.md) – opis całego projektu.
