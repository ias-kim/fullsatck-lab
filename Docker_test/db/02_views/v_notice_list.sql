-- 권장 제약 (과목당 교수 1명 보장)
ALTER TABLE course_professor
    ADD CONSTRAINT uk_cp_one_prof UNIQUE (course_id);

-- 뷰: 교수 1명을 작성자로 사용
CREATE OR REPLACE VIEW v_notice_list AS
SELECT
    c.sec_id,
    n.notice_id,
    n.title,
    n.created_at,
    n.course_id,
    c.title                 AS course_title,
    prof.user_id            AS author_id,    -- 담당 교수 = 작성자
    prof.name               AS author_name,  -- 담당 교수명
    ur.role_type            AS author_role,  -- 담당 교수의 권한(1인1역 가정)
    COALESCE(t.targets, JSON_ARRAY()) AS targets
FROM notice n
         JOIN course c
              ON c.course_id = n.course_id
         JOIN course_professor cp
              ON cp.course_id = c.course_id
         JOIN user_account prof
              ON prof.user_id = cp.user_id
         LEFT JOIN (
    SELECT user_id, MIN(role_type) AS role_type
    FROM user_role
    GROUP BY user_id
) ur
                   ON ur.user_id = prof.user_id
         LEFT JOIN (
    SELECT
        nt.notice_id,
        JSON_ARRAYAGG(
                JSON_OBJECT('grade_id', nt.grade_id, 'level_id', nt.level_id, 'language_id', nt.language_id)
        ) AS targets
    FROM notice_target nt
    GROUP BY nt.notice_id
) t
                   ON t.notice_id = n.notice_id
ORDER BY n.created_at DESC;