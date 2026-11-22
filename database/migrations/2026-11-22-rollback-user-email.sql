-- Rollback of the optional email-column migration.
-- Run only if database/migrations/2026-11-22-add-user-email.sql was already applied.
ALTER TABLE users DROP INDEX uq_users_email;
ALTER TABLE users DROP COLUMN email;
