CREATE OR REPLACE VIEW v_notice_details AS
SELECT
    n.notice_id,
    n.title,
    n.content,
    n.created_at,
    c.course_id,
    c.title AS course_title,
    f.file_id,
    f.file_name,
    f.file_url,
    nt.grade_id,
    nt.level_id,
    nt.language_id
FROM notice n
         LEFT JOIN course c      ON c.course_id = n.course_id
         LEFT JOIN notice_file nf ON nf.notice_id = n.notice_id
         LEFT JOIN file_assets f  ON f.file_id = nf.file_id
         LEFT JOIN notice_target nt ON nt.notice_id = n.notice_id;

-- :notice_id 에는 보고자 하는 공지사항의 ID를 넣습니다.
SELECT *
FROM v_notice_details
WHERE notice_id = :notice_id;