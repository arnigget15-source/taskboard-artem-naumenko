# Backend

Folder `backend/` będzie zawierał serwerową część aplikacji TaskBoard. Backend będzie działać jako pośrednik pomiędzy frontendem a bazą danych. Użytkownik będzie wykonywać czynności w interfejsie, frontend przekaże odpowiednie żądanie do serwera, a backend sprawdzi dane, wykona wymaganą operację i zwróci wynik.

Ta część projektu będzie odpowiadać za logikę działania aplikacji, a nie za wygląd strony.

## Jakie zadania będzie wykonywać backend?

Najważniejsze obowiązki backendu to:
- obsługa rejestracji użytkowników i tworzenia kont;
- logowanie oraz sprawdzanie, czy użytkownik ma prawo korzystać z określonych danych;
- odbieranie żądań wysyłanych przez frontend;
- sprawdzanie poprawności danych, na przykład tytułu zadania lub nazwy tablicy;
- tworzenie, odczytywanie, edytowanie i usuwanie tablic;
- wykonywanie podobnych operacji na zadaniach;
- zmiana statusu i priorytetu zadania oraz aktualizacja terminu;
- przypisywanie zadania do wybranego użytkownika;
- pobieranie danych z bazy i zapisywanie w niej wprowadzonych zmian;
- zwracanie komunikatów o powodzeniu lub błędach.

## Jak może wyglądać obsługa przykładowej operacji?

Przykładowo użytkownik otwiera tablicę i dodaje nowe zadanie. Frontend zbiera tytuł, opis, priorytet i termin, a następnie wysyła je do backendu. Serwer sprawdza, czy użytkownik jest zalogowany, czy ma dostęp do danej tablicy i czy przekazane wartości są poprawne. Jeżeli wszystko się zgadza, backend zapisuje zadanie w bazie danych i zwraca informację o wyniku. Frontend może wtedy wyświetlić nową kartę zadania.

## Organizacja kodu

W folderze mogą znaleźć się pliki odpowiedzialne za różne części logiki, na przykład:
- obsługę kont użytkowników i logowania;
- operacje na tablicach;
- operacje na zadaniach;
- połączenie z bazą danych;
- sprawdzanie poprawności danych;
- konfigurację serwera i ustawień środowiska.

Możliwe będzie również rozdzielenie obsługi żądań na osobne trasy API. Przykładowo jedna grupa tras będzie dotyczyć użytkowników, druga tablic, a kolejna zadań. Konkretne nazwy plików, framework i sposób uruchomienia zostaną określone podczas implementacji.

## Bezpieczeństwo i poprawność danych

Backend musi ponownie sprawdzać dane otrzymane z przeglądarki, ponieważ walidacja formularza po stronie frontendu nie wystarcza. Powinien też kontrolować dostęp użytkownika do tablic i zadań, aby nie można było modyfikować cudzych danych bez uprawnień.

Hasła nie mogą być zapisywane w bazie w postaci zwykłego tekstu. W diagramie danych przewidziano pole `passwordHash`, które będzie przechowywać bezpieczny skrót hasła. Przy usuwaniu tablic i zadań przewidziano mechanizm *soft delete*, czyli zapisanie informacji o usunięciu zamiast natychmiastowego kasowania rekordu.

## Powiązanie z pozostałymi częściami projektu

- [Frontend](../frontend/README.md) – wysyła żądania i wyświetla odpowiedzi backendu.
- [Baza danych](../database/README.md) – przechowuje informacje, z których korzysta serwer.
- [Diagram ERD](../materialy/erd.md) – opisuje strukturę danych i relacje między tabelami.

## Aktualny stan

Na obecnym etapie folder zawiera opis planowanej części serwerowej. Kod backendu, konfiguracja i dokładna instrukcja uruchomienia zostaną dodane po wybraniu technologii i rozpoczęciu implementacji.
