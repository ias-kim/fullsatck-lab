-- =========================================================
-- WIREFRAME TEST (ENGLISH VERSION)
-- =========================================================
START TRANSACTION;

-- ---------- GIVEN: Base Users ----------
INSERT INTO user_account (user_id, name, email, phone, status)
VALUES (100,'Admin','admin@gsc.ac.kr','010-0000-0000','active'),
       (201,'Alice','s1@gsc.ac.kr','010-1111-1111','active'),
       (202,'Bob','s2@gsc.ac.kr','010-2222-2222','active');

INSERT INTO user_role (user_id, role_type) VALUES
                                               (100,'admin'), (201,'student'), (202,'student');

-- Academic classification
INSERT INTO grade (grade_id,name) VALUES ('G1','Grade1')
    ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO level (level_id,name) VALUES ('L3','JLPT N3'), ('L2','JLPT N2'), ('L1','JLPT N1')
    ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO nationality (nationality_id,name) VALUES ('KR','Korean')
    ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO level_class (class_id, level_id, name)
VALUES ('C-N3','L3','Class-N3'), ('C-N2','L2','Class-N2')
    ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Students
INSERT INTO student_entity (user_id, grade_id, class_id, nationality_id, status)
VALUES (201,'G1','C-N3','KR','재학'),
       (202,'G1','C-N2','KR','재학');

-- Kakao mock
INSERT INTO kakao_user (user_id, kakao_id)
VALUES (201,'kakao_201'), (202,'kakao_202')
    ON DUPLICATE KEY UPDATE kakao_id=VALUES(kakao_id);

-- ---------- GIVEN: Semester / Courses ----------
INSERT INTO section (sec_id, semester, year, start_date, end_date)
VALUES ('S2025-1',1,2025,'2025-03-01','2025-06-30')
    ON DUPLICATE KEY UPDATE start_date=VALUES(start_date), end_date=VALUES(end_date);

INSERT INTO classroom (classroom_id, building, room_number, room_type)
VALUES ('R304','BuildingA','304','CLASSROOM')
    ON DUPLICATE KEY UPDATE building=VALUES(building);

INSERT INTO time_slot (time_slot_id, start_time, end_time, day)
VALUES ('TS-MON-1','09:00','09:50','Mon'),
       ('TS-WED-1','09:00','09:50','Wed')
    ON DUPLICATE KEY UPDATE start_time=VALUES(start_time), end_time=VALUES(end_time);

INSERT INTO course (course_id, title, is_special, sec_id)
VALUES ('COURSE-REG1','Japanese Regular (Grade1)',FALSE,'S2025-1'),
       ('COURSE-SPEC-N3','Special Class (N3)',TRUE,'S2025-1')
    ON DUPLICATE KEY UPDATE title=VALUES(title);

INSERT INTO course_schedule (schedule_id, time_slot_id, course_id, classroom_id)
VALUES ('SCH1','TS-MON-1','COURSE-REG1','R304'),
       ('SCH2','TS-WED-1','COURSE-SPEC-N3','R304');

INSERT INTO course_target (target_id, course_id, grade_id, level_id, nationality_id)
VALUES ('TGT-REG1','COURSE-REG1','G1',NULL,NULL),
       ('TGT-N3','COURSE-SPEC-N3',NULL,'L3',NULL)
    ON DUPLICATE KEY UPDATE grade_id=VALUES(grade_id), level_id=VALUES(level_id);

-- =========================================================
-- 1) Student can see only their courses
-- =========================================================
SELECT c.course_id, c.title, c.is_special
FROM course c
         LEFT JOIN course_target t ON t.course_id=c.course_id
         LEFT JOIN student_entity s ON s.user_id=201
         LEFT JOIN level_class lc ON lc.class_id=s.class_id
WHERE (t.grade_id IS NULL OR t.grade_id = s.grade_id)
  AND (t.level_id IS NULL OR t.level_id = lc.level_id);

-- =========================================================
-- 2) Notice creation → Kakao delivery → Student view
-- =========================================================
INSERT INTO notice (course_id, author_user_id, title, content)
VALUES ('COURSE-SPEC-N3',100,'N3 Special Notice','Wed 9AM');

SET @notice_id := LAST_INSERT_ID();

INSERT INTO notice_target (target_id, notice_id, level_id)
VALUES ('NT-L3', @notice_id, 'L3');

INSERT INTO notification_delivery_notice (message_id, user_id, notice_id, status)
SELECT CONCAT('kakao-',UUID()), u.user_id, @notice_id, 'SENT'
FROM user_account u
         JOIN student_entity s ON s.user_id=u.user_id
         JOIN level_class lc   ON lc.class_id=s.class_id
         JOIN notice_target nt ON nt.notice_id=@notice_id
WHERE (nt.grade_id IS NULL OR nt.grade_id=s.grade_id)
  AND (nt.level_id IS NULL OR nt.level_id=lc.level_id)
  AND (nt.nationality_id IS NULL OR nt.nationality_id=s.nationality_id);

SELECT user_id, notice_id, status FROM notification_delivery_notice WHERE notice_id=@notice_id;

UPDATE notification_delivery_notice
SET read_at = NOW()
WHERE notice_id=@notice_id AND user_id=201;

SELECT
    n.notice_id, n.title,
    SUM(ndn.read_at IS NULL) AS unread_cnt,
    SUM(ndn.read_at IS NOT NULL) AS read_cnt
FROM notice n
         JOIN notification_delivery_notice ndn ON ndn.notice_id=n.notice_id
WHERE n.notice_id=@notice_id
GROUP BY n.notice_id, n.title;

-- =========================================================
-- 3) Course events (Holiday / Makeup class) + delivery
-- =========================================================
INSERT INTO course_event (event_id, event_type, event_date, course_id, reason)
VALUES ('EVT-HOLIDAY-1','휴강','2025-03-17','COURSE-REG1','Personal reason');

INSERT INTO notification_delivery_event (message_id, user_id, event_id, status)
SELECT CONCAT('kakao-',UUID()), u.user_id, 'EVT-HOLIDAY-1', 'SENT'
FROM user_account u
         JOIN student_entity s ON s.user_id=u.user_id
         JOIN course_target t  ON t.course_id='COURSE-REG1'
WHERE (t.grade_id IS NULL OR t.grade_id=s.grade_id)
  AND (t.nationality_id IS NULL OR t.nationality_id=s.nationality_id);

SELECT * FROM notification_delivery_event WHERE event_id='EVT-HOLIDAY-1';

INSERT INTO course_event (event_id, event_type, event_date, course_id, time_slot_id, classroom_id, reason)
VALUES ('EVT-MAKEUP-1','보강','2025-03-19','COURSE-REG1','TS-WED-1','R304','Make-up');

INSERT INTO notification_delivery_event (message_id, user_id, event_id, status)
SELECT CONCAT('kakao-',UUID()), u.user_id, 'EVT-MAKEUP-1', 'SENT'
FROM user_account u
         JOIN student_entity s ON s.user_id=u.user_id
         JOIN course_target t  ON t.course_id='COURSE-REG1'
WHERE (t.grade_id IS NULL OR t.grade_id=s.grade_id)
  AND (t.nationality_id IS NULL OR t.nationality_id=s.nationality_id);

-- =========================================================
-- 4) Lab weekend usage vote
-- =========================================================
INSERT INTO reservation (user_id, classroom_id, title, start_at, end_at)
VALUES (100,'R304','Weekend Open (Sat)','2025-03-22 13:00','2025-03-22 15:00');

SET @res_id := LAST_INSERT_ID();

INSERT INTO reservation_vote (reservation_id, user_id, will_join)
VALUES (@res_id,201,TRUE), (@res_id,202,FALSE)
    ON DUPLICATE KEY UPDATE will_join=VALUES(will_join);

SELECT
    reservation_id,
    SUM(will_join=TRUE)  AS yes_cnt,
    SUM(will_join=FALSE) AS no_cnt
FROM reservation_vote
WHERE reservation_id=@res_id
GROUP BY reservation_id;

-- =========================================================
-- 5) Hardware lab booking overlap check
-- =========================================================
INSERT INTO reservation (user_id, classroom_id, title, start_at, end_at)
VALUES (201,'R304','Hardware Lab','2025-03-23 19:00','2025-03-23 20:00');

SELECT EXISTS(
    SELECT 1 FROM reservation r
    WHERE r.classroom_id='R304' AND r.status='ACTIVE'
      AND '2025-03-23 19:30' < r.end_at
      AND '2025-03-23 20:30' > r.start_at
) AS overlap_expected_1;

SELECT EXISTS(
    SELECT 1 FROM reservation r
    WHERE r.classroom_id='R304' AND r.status='ACTIVE'
      AND '2025-03-23 20:00' < r.end_at
      AND '2025-03-23 21:00' > r.start_at
) AS overlap_expected_0;

-- =========================================================
-- END
-- =========================================================
ROLLBACK;