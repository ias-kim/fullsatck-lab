CREATE OR REPLACE VIEW v_notice_list AS
SELECT
    n.notice_id,
    n.title,
    n.created_at,
    c.course_id,
    c.title AS course_title,
    -- 이 공지의 타겟 정보
    nt.grade_id    AS target_grade_id,
    nt.level_id    AS target_level_id,
    nt.language_id AS target_language_id
FROM notice n
         -- 과목 공지가 아닐 수도 있으므로 LEFT JOIN
         LEFT JOIN course c ON c.course_id = n.course_id
    -- 타겟이 지정되지 않은 전체 공지일 수도 있으므로 LEFT JOIN
         LEFT JOIN notice_target nt ON nt.notice_id = n.notice_id;

CREATE OR REPLACE VIEW v_notice_list AS
SELECT
    n.notice_id,
    n.title,
    n.created_at,
    c.course_id,
    c.title AS course_title,
    -- 이 공지의 타겟 정보
    nt.grade_id    AS target_grade_id,
    nt.level_id    AS target_level_id,
    nt.language_id AS target_language_id
FROM notice n
         -- 과목 공지가 아닐 수도 있으므로 LEFT JOIN
         LEFT JOIN course c ON c.course_id = n.course_id
    -- 타겟이 지정되지 않은 전체 공지일 수도 있으므로 LEFT JOIN
         LEFT JOIN notice_target nt ON nt.notice_id = n.notice_id;

-- 교수가 로그인했을 때
SELECT *
FROM v_notice_list
ORDER BY created_at DESC;

-- 학생(예: user_id = @john)이 로그인했을 때
SELECT
    vn.notice_id,
    vn.title,
    vn.created_at,
    vn.course_title
FROM
    v_notice_list vn
        JOIN
    student_entity se ON se.user_id = @john_id
-- 학생의 레벨(level) 정보를 얻기 위해 level_class JOIN
        JOIN
    level_class lc ON lc.class_id = se.class_id
WHERE
   -- 조건 1: 전체 공지 (타겟이 아예 지정 안 된 공지)
    (vn.target_grade_id IS NULL AND vn.target_level_id IS NULL AND vn.target_language_id IS NULL)
   -- 조건 2: 학생의 학년과 공지의 타겟 학년이 일치하는 경우
   OR (vn.target_grade_id = se.grade_id)
   -- 조건 3: 학생의 레벨과 공지의 타겟 레벨이 일치하는 경우
   OR (vn.target_level_id = lc.level_id)
   -- 조건 4: 학생의 언어와 공지의 타겟 언어가 일치하는 경우
   OR (vn.target_language_id = se.language_id)
ORDER BY
    created_at DESC;