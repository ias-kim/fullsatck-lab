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
