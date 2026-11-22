-- Safe migration for an existing local TaskBoard database.
-- Run once in phpMyAdmin after selecting the taskboard database.
-- Existing users receive a placeholder address based on their unique login.
ALTER TABLE users ADD COLUMN email VARCHAR(254) NULL AFTER id;
UPDATE users SET email = CONCAT(login, '@taskboard.local') WHERE email IS NULL;
ALTER TABLE users MODIFY email VARCHAR(254) NOT NULL;
ALTER TABLE users ADD UNIQUE KEY uq_users_email (email);
