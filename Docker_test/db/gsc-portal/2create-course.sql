SET @john := (SELECT user_id FROM user_account WHERE email='john1@yju.ac.kr' LIMIT 1);

INSERT INTO course_student (user_id, course_id)
VALUES (@john,'COURSE-G1-01')
    ON DUPLICATE KEY UPDATE course_id=VALUES(course_id);

INSERT INTO notice (course_id, title, content)
VALUES ('COURSE-G1-01','[수강 등록 완료] 오리엔테이션 안내','강의 계획서를 확인하세요.');
SET @n := LAST_INSERT_ID();

-- 타깃은 의미상 아무거나 OK. 팬아웃에서 “해당 1명만” 선택
INSERT INTO notice_target (target_id, notice_id, grade_id, level_id, language_id)
VALUES (CONCAT('NT-ENROLL-','COURSE-G1-01','-',@john), @n, NULL, NULL, NULL)
    ON DUPLICATE KEY UPDATE notice_id=VALUES(notice_id);

-- 팬아웃: 방금 등록된 학생 1명
INSERT IGNORE INTO notification_delivery_notice (user_id, notice_id, message_id, status)
VALUES (@john, @n, CONCAT('MSG-N-',UUID_SHORT()), 'SENT');

SELECT ua.name, ndn.status, ndn.read_at
FROM notification_delivery_notice ndn
         JOIN user_account ua ON ua.user_id=ndn.user_id
WHERE ndn.notice_id=@n;