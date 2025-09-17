-- 과목 타겟(course_target: grade_id/level_id/language_id)에 맞는 학생 자동 필터
CREATE OR REPLACE VIEW v_course_students_auto AS
SELECT DISTINCT
    c.course_id,
    se.user_id
FROM course c
         JOIN course_target ct ON ct.course_id = c.course_id
         JOIN student_entity se ON 1=1
         LEFT JOIN level_class lc ON lc.class_id = se.class_id
WHERE
    (ct.grade_id    IS NULL OR ct.grade_id    = se.grade_id)
  AND (ct.level_id    IS NULL OR ct.level_id    = lc.level_id)
  AND (ct.language_id IS NULL OR ct.language_id = se.language_id);

ALTER TABLE course_student
    ADD UNIQUE KEY uk_cs (course_id, user_id);

ALTER TABLE course_professor
    ADD UNIQUE KEY uk_cp (course_id, user_id);