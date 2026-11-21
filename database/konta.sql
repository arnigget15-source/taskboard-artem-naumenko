-- Trzy konta MySQL dla TaskBoard.
-- Uruchom jako administrator MySQL po zaimportowaniu database/taskboard.sql.
-- Zmień hasła CHANGE_ME_* na własne silne hasła przed wykonaniem.
-- Hasła muszą być takie same jak odpowiednie wartości w lokalnym pliku .env.
CREATE USER IF NOT EXISTS 'taskboard_app'@'localhost'
  IDENTIFIED BY 'CHANGE_ME_app_password';
CREATE USER IF NOT EXISTS 'taskboard_admin'@'localhost'
  IDENTIFIED BY 'CHANGE_ME_admin_password';
CREATE USER IF NOT EXISTS 'taskboard_readonly'@'localhost'
  IDENTIFIED BY 'CHANGE_ME_readonly_password';

-- Aplikacja: bez DELETE, DROP, ALTER ani uprawnień administracyjnych.
GRANT SELECT, INSERT, UPDATE
  ON taskboard.* TO 'taskboard_app'@'localhost';

-- Administrator bazy: pełne uprawnienia wyłącznie do taskboard.
GRANT ALL PRIVILEGES
  ON taskboard.* TO 'taskboard_admin'@'localhost';

-- Konto tylko do odczytu.
GRANT SELECT
  ON taskboard.* TO 'taskboard_readonly'@'localhost';
