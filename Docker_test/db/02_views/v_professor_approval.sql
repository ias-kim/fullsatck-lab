-- View: v_professor_approval
CREATE OR REPLACE VIEW v_professor_approval AS
SELECT
    ua.user_id,
    ua.name,
    ua.email,
    ua.phone,
    ua.status
FROM user_account ua
         JOIN user_role ur ON ur.user_id = ua.user_id AND ur.role_type='professor'
WHERE ua.status='pending';