INSERT INTO file_assets (file_id, file_name, file_url, file_type)
VALUES ('F000000001','Week1.pdf','https://files.example/week1.pdf','PDF')
    ON DUPLICATE KEY UPDATE file_name=VALUES(file_name);

INSERT INTO notice (course_id, title, content)
VALUES ('COURSE-G1-01','[G1] Week 1 Materials','Please review Week1 slides.');
SET @n := LAST_INSERT_ID();

INSERT INTO notice_file (notice_id, file_id)
VALUES (@n,'F000000001')
    ON DUPLICATE KEY UPDATE file_id=VALUES(file_id);

-- 타깃: 학년=G1 (레벨/언어는 전체)
INSERT INTO notice_target (target_id, notice_id, grade_id, level_id, language_id)
VALUES ('NT-G1-W1', @n, 'G1', NULL, NULL)
    ON DUPLICATE KEY UPDATE notice_id=VALUES(notice_id);

INSERT IGNORE INTO notification_delivery_notice (user_id, notice_id, message_id, status)
SELECT DISTINCT se.user_id, @n, CONCAT('MSG-N-',UUID_SHORT()), 'SENT'
FROM notice_target nt
         JOIN student_entity se ON 1=1
WHERE nt.notice_id=@n
  AND (nt.grade_id    IS NULL OR nt.grade_id=se.grade_id)
  AND (nt.level_id    IS NULL OR nt.level_id IN (
    SELECT lc.level_id FROM level_class lc WHERE lc.class_id=se.class_id
))
  AND (nt.language_id IS NULL OR nt.language_id=se.language_id);

SELECT ua.name, ndn.status, ndn.read_at
FROM notification_delivery_notice ndn
         JOIN user_account ua ON ua.user_id=ndn.user_id
WHERE ndn.notice_id=@n;

-- 어떤 학생이 열람했다고 가정
UPDATE notification_delivery_notice
SET read_at=NOW()
WHERE notice_id=@n AND user_id=@john;

SELECT
    SUM(read_at IS NULL)   AS unread_count,
    SUM(read_at IS NOT NULL) AS read_count
FROM notification_delivery_notice
WHERE notice_id=@n;