CREATE OR REPLACE VIEW v_student_directory AS
SELECT
    ua.user_id,
    ua.name,
    ua.email,
    ua.phone,
    se.grade_id,
    g.name      AS grade_name,
    se.class_id,
    lc.name     AS class_name,
    l.level_id,
    l.name      AS level_name,
    se.language_id,
    lang.name   AS language_name,
    se.is_international,
    se.status   AS student_status  -- 'enrolled','leave','dropped','graduated' 권장
FROM user_account ua
         JOIN student_entity se ON se.user_id = ua.user_id
         JOIN grade g           ON g.grade_id = se.grade_id
         JOIN level_class lc    ON lc.class_id = se.class_id
         JOIN level l           ON l.level_id = lc.level_id
         JOIN language lang     ON lang.language_id = se.language_id;

-- 기본 목록
SELECT *
FROM v_student_directory
WHERE grade_id IN ('G1','G2','G3')
  AND student_status = 'leave'
ORDER BY grade_id, class_id, name;

-- 자퇴/졸업
SELECT *
FROM v_student_directory
WHERE student_status IN ('dropped','graduated')
ORDER BY grade_id, class_id, name;

ALTER TABLE student_entity
    ADD KEY IF NOT EXISTS ix_se_grade_status (grade_id, status),
    ADD KEY IF NOT EXISTS ix_se_class (class_id);

ALTER TABLE user_account
    ADD KEY IF NOT EXISTS ix_user_name (name);