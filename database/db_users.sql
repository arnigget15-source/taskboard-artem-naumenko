-- Konta MySQL dla bazy TaskBoard.
-- Uruchom TEN skrypt po database/taskboard.sql jako administrator MySQL (np. root).
-- Przed uruchomieniem zmień wszystkie hasła CHANGE_ME na własne, silne hasła.
-- Nie używaj tych przykładowych haseł w środowisku publicznym.

CREATE USER IF NOT EXISTS 'taskboard_app'@'localhost'
  IDENTIFIED BY 'CHANGE_ME_app_password';
CREATE USER IF NOT EXISTS 'taskboard_admin'@'localhost'
  IDENTIFIED BY 'CHANGE_ME_admin_password';
CREATE USER IF NOT EXISTS 'taskboard_readonly'@'localhost'
  IDENTIFIED BY 'CHANGE_ME_readonly_password';

-- Aplikacja: odczyt i modyfikacja danych, bez uprawnień administracyjnych DDL.
GRANT SELECT, INSERT, UPDATE, DELETE
  ON taskboard.* TO 'taskboard_app'@'localhost';

-- Administrator bazy: pełne uprawnienia tylko w obrębie taskboard.
GRANT ALL PRIVILEGES
  ON taskboard.* TO 'taskboard_admin'@'localhost';

-- Odczyt: tylko SELECT, bez możliwości modyfikowania danych.
GRANT SELECT
  ON taskboard.* TO 'taskboard_readonly'@'localhost';
