-- MySQL accounts for the TaskBoard local XAMPP database.
-- Run as MySQL administrator AFTER importing database/taskboard.sql.
-- taskboard_app credentials must match the root .env file.
-- The app account is reset to the requested local password on every run.
-- Change the CHANGE_ME passwords before using the optional admin/read-only accounts.

CREATE USER IF NOT EXISTS 'taskboard_app'@'localhost'
  IDENTIFIED BY 'TBpassword123';
ALTER USER 'taskboard_app'@'localhost'
  IDENTIFIED BY 'TBpassword123';

CREATE USER IF NOT EXISTS 'taskboard_admin'@'localhost'
  IDENTIFIED BY 'CHANGE_ME_admin_password';
CREATE USER IF NOT EXISTS 'taskboard_readonly'@'localhost'
  IDENTIFIED BY 'CHANGE_ME_readonly_password';

-- Backend needs SELECT, INSERT, UPDATE (soft delete is an UPDATE).
GRANT SELECT, INSERT, UPDATE
  ON taskboard.* TO 'taskboard_app'@'localhost';

-- Optional database administrator, restricted to this database.
GRANT ALL PRIVILEGES
  ON taskboard.* TO 'taskboard_admin'@'localhost';

-- Optional read-only account.
GRANT SELECT
  ON taskboard.* TO 'taskboard_readonly'@'localhost';
