-- 과목
INSERT INTO course (course_id, sec_id, title, is_special)
VALUES ('COURSE-G1-01','2025-2','G1 JLPT Core',FALSE)
    ON DUPLICATE KEY UPDATE title=VALUES(title);

-- 시간표(월/수 S01)
INSERT INTO course_schedule (schedule_id,classroom_id,time_slot_id,course_id,sec_id,day_of_week) VALUES
                                                                                                     ('SCH-G1-MON-01','CM405','S01','COURSE-G1-01','2025-2','MON'),
                                                                                                     ('SCH-G1-WED-01','CM405','S01','COURSE-G1-01','2025-2','WED')
    ON DUPLICATE KEY UPDATE classroom_id=VALUES(classroom_id);

-- 공지 레코드(시스템 공지로 남김)
INSERT INTO notice (course_id, title, content)
VALUES ('COURSE-G1-01','[안내] 시간표가 등록되었습니다.','학기 일정에 새 시간표가 반영되었습니다.');
SET @n := LAST_INSERT_ID();

-- 타깃: 해당 과목 수강생 전체
INSERT INTO notice_target (target_id, notice_id, grade_id, level_id, language_id)
VALUES (CONCAT('NT-INIT-','COURSE-G1-01'), @n, NULL, NULL, NULL)
    ON DUPLICATE KEY UPDATE notice_id=VALUES(notice_id);

-- 팬아웃: 수강생
INSERT IGNORE INTO notification_delivery_notice (user_id, notice_id, message_id, status)
SELECT csu.user_id, @n, CONCAT('MSG-N-',UUID_SHORT()), 'SENT'
FROM course_student csu WHERE csu.course_id='COURSE-G1-01';

-- (옵션) 교수도 받게 하려면:
INSERT IGNORE INTO notification_delivery_notice (user_id, notice_id, message_id, status)
SELECT cp.user_id, @n, CONCAT('MSG-N-',UUID_SHORT()), 'SENT'
FROM course_professor cp WHERE cp.course_id='COURSE-G1-01';

SELECT ua.name, ndn.status, ndn.read_at
FROM notification_delivery_notice ndn
         JOIN user_account ua ON ua.user_id=ndn.user_id
WHERE ndn.notice_id=@n;