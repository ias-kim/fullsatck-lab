

CREATE OR REPLACE VIEW v_allowed_email AS
SELECT id, email, COALESCE(reason,'') AS reason, COALESCE(tag,'') AS tag
FROM allowed_email;