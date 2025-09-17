-- View: v_student_approval
-- 목적: 사용자 승인 대기(학생) 목록
-- 입력필터: 없음(뷰), 사용 시 WHERE로 추가
-- 인덱스 전제: user_account(status), user_role(role_type,user_id), student_entity(user_id)

CREATE OR REPLACE VIEW v_student_approval AS
SELECT
    ua.user_id,
    ua.name,
    ua.email,
    ua.phone,
    g.name    AS grade_name,
    lc.name   AS class_name,
    l.name    AS level_name,
    lang.name AS language_name,
    se.is_international,
    ua.status
FROM user_account ua
         JOIN user_role ur         ON ur.user_id = ua.user_id AND ur.role_type='student'
         LEFT JOIN student_entity se ON se.user_id = ua.user_id
         LEFT JOIN grade g           ON se.grade_id = g.grade_id
         LEFT JOIN level_class lc    ON se.class_id = lc.class_id
         LEFT JOIN level l           ON lc.level_id = l.level_id
         LEFT JOIN language lang     ON se.language_id = lang.language_id
WHERE ua.status='pending';

ALTER TABLE user_role ADD UNIQUE KEY uk_user_role (user_id, role_type);
ALTER TABLE user_account ADD KEY ix_ua_status (status);
ALTER TABLE student_entity ADD KEY ix_se_user (user_id);