CREATE OR REPLACE VIEW v_notice_details AS
SELECT
    n.notice_id,
    n.title,
    n.content,
    n.created_at,
    n.course_id,
    c.title AS course_title,
    /* 첨부파일 배열 */
    COALESCE(JSON_ARRAYAGG(
                     JSON_OBJECT('file_id', f.file_id, 'name', f.file_name, 'url', f.file_url)
             ) FILTER (WHERE f.file_id IS NOT NULL), JSON_ARRAY()) AS files,
    /* 타겟 배열 */
    COALESCE(JSON_ARRAYAGG(
                     JSON_OBJECT('grade_id', nt.grade_id, 'level_id', nt.level_id, 'language_id', nt.language_id)
             ) FILTER (WHERE nt.notice_id IS NOT NULL), JSON_ARRAY()) AS targets
FROM notice n
         LEFT JOIN course c         ON c.course_id = n.course_id
         LEFT JOIN notice_file nf   ON nf.notice_id = n.notice_id
         LEFT JOIN file_assets f    ON f.file_id = nf.file_id
         LEFT JOIN notice_target nt ON nt.notice_id = n.notice_id
GROUP BY n.notice_id, n.title, n.content, n.created_at, n.course_id, c.title;