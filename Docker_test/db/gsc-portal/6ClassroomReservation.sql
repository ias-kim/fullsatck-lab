
set @u := (select user_id from user_account where email='john1@yju.ac.kr' limit 1);
set @room := 'CM4051';
SET @start := '2025-10-03 09:00:00';
SET @end   := '2025-10-03 10:00:00';

-- 1) LAB 여부 가드
SELECT classroom_id, room_type FROM classroom WHERE classroom_id=@room;
-- => room_type='LAB' 인지 확인 and status
insert into classroom (classroom_id, building, room_number, room_type) values ('CM4051', 'Cheongmun', '405-1', 'LAB');

SELECT reservation_id, start_at, end_at
FROM reservation
WHERE classroom_id=@room AND status='ACTIVE'
  AND start_at < @end
  AND end_at   > @start;

INSERT INTO reservation (user_id, classroom_id, title, start_at, end_at, status)
SELECT @u, @room, 'Hardware Lab', @start, @end, 'ACTIVE'
    WHERE NOT EXISTS (
    SELECT 1 FROM reservation
    WHERE classroom_id=@room AND status='ACTIVE'
      AND start_at < @end AND end_at > @start
);

SELECT reservation_id, classroom_id, title, start_at, end_at, status
FROM reservation
WHERE user_id=@u
ORDER BY start_at;

-- 0) 파라미터: 일요일 예시
SET @poll_id := '20251005';
SET @room    := 'CM4051';            -- CLASSROOM 방
SET @date    := '2025-10-05';       -- 반드시 주말(SAT/SUN)
SET @need    := 3;                  -- 임계 인원
SET @grade   := 'G1';



INSERT INTO weekend_attendance_poll
(poll_id, grade_id, classroom_id, poll_date, target_weekend, required_count, status)
SELECT @poll_id, @grade, c.classroom_id, @date, 'SUN', @need, FALSE
FROM classroom c
WHERE c.classroom_id=@room
    ON DUPLICATE KEY UPDATE required_count=VALUES(required_count);


-- 2) 투표 (예: 3명이 YES)
SET @u1 := (SELECT user_id FROM user_account WHERE email='john1@yju.ac.kr'  LIMIT 1);
SET @u2 := (SELECT user_id FROM user_account WHERE email='alice@yju.ac.kr'     LIMIT 1);
SET @u3 := (SELECT user_id FROM user_account WHERE email='sara@intl.ac.kr'     LIMIT 1);

INSERT INTO weekend_attendance_votes (poll_id, user_id, will_join)
VALUES
    (@poll_id, @u1, TRUE),
    (@poll_id, @u2, TRUE),
    (@poll_id, @u3, TRUE)
    ON DUPLICATE KEY UPDATE will_join=VALUES(will_join), voted_at=NOW();

-- 3) 집계 확인
SELECT p.poll_id, p.classroom_id, p.poll_date, p.required_count,
       SUM(v.will_join=TRUE) AS yes_votes, p.status AS is_open
FROM weekend_attendance_poll p
         LEFT JOIN weekend_attendance_votes v ON v.poll_id=p.poll_id
WHERE p.poll_id=@poll_id
GROUP BY p.poll_id, p.classroom_id, p.poll_date, p.required_count, p.status;

-- 4) 임계치 달성 & 아직 미오픈이면: 개방 확정 + 공지 생성 + 학년 타깃 팬아웃
-- 임계치 충족 시 status=TRUE
UPDATE weekend_attendance_poll
SET status=TRUE
WHERE poll_id=@poll_id
  AND (SELECT COUNT(*) FROM weekend_attendance_votes WHERE poll_id=@poll_id AND will_join=TRUE) >= required_count
  AND status=FALSE;

-- 최종 상태 확인
SELECT poll_id, classroom_id, poll_date, required_count, status
FROM weekend_attendance_poll
WHERE poll_id=@poll_id;