-- Core indexes (승인 화면/계정 공통)
ALTER TABLE user_account
    ADD KEY IF NOT EXISTS ix_user_status (status),
    ADD KEY IF NOT EXISTS ix_user_name (name);

ALTER TABLE user_role
    ADD KEY IF NOT EXISTS ix_ur_role_user (role_type, user_id);

ALTER TABLE student_entity
    ADD KEY IF NOT EXISTS ix_se_user (user_id),
    ADD KEY IF NOT EXISTS ix_se_grade_class (grade_id, class_id);