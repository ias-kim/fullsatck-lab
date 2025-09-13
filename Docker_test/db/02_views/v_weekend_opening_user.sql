CREATE OR REPLACE VIEW v_weekend_opening_overview AS
SELECT
    p.poll_id,
    p.poll_date,
    p.target_weekend,                                 -- 'SAT' | 'SUN'
    p.classroom_id,
    CONCAT(c.building, ' ', c.room_number) AS classroom_name,
    p.grade_id,
    g.name AS grade_name,
    p.required_count,
    COALESCE(SUM(CASE WHEN v.will_join THEN 1 ELSE 0 END), 0) AS yes_votes,
    (COALESCE(SUM(CASE WHEN v.will_join THEN 1 ELSE 0 END), 0) >= p.required_count) AS reached,  -- 임계 도달 여부
    p.status AS is_open,                               -- 확정(오픈) 상태
    /* 같은 날짜 동일 방에 이미 예약이 있나 (정보 표시용) */
    EXISTS (
        SELECT 1
        FROM reservation r
        WHERE r.classroom_id = p.classroom_id
          AND DATE(r.start_at) = p.poll_date
            AND r.status = 'ACTIVE'
    ) AS has_reservation
FROM weekend_attendance_poll p
         JOIN classroom c ON c.classroom_id = p.classroom_id
         LEFT JOIN grade g ON g.grade_id = p.grade_id
         LEFT JOIN weekend_attendance_votes v ON v.poll_id = p.poll_id
WHERE p.poll_date >= CURDATE()                        -- 오늘 이후
GROUP BY
    p.poll_id, p.poll_date, p.target_weekend, p.classroom_id,
    classroom_name, p.grade_id, grade_name, p.required_count, p.status;


-- 이번 주말(토/일) 카드
SELECT *
FROM v_weekend_opening_overview
WHERE WEEKOFYEAR(poll_date) = WEEKOFYEAR(CURDATE())
          AND YEAR(poll_date) = YEAR(CURDATE())
ORDER BY poll_date, classroom_name;

-- 앞으로 4주간 개방/신청 현황
SELECT *
FROM v_weekend_opening_overview
WHERE poll_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 28 DAY)
ORDER BY poll_date, classroom_name;

ALTER TABLE weekend_attendance_poll
    ADD KEY IF NOT EXISTS ix_poll_room_date (classroom_id, poll_date),
    ADD KEY IF NOT EXISTS ix_poll_grade_date (grade_id, poll_date);

ALTER TABLE weekend_attendance_votes
    ADD KEY IF NOT EXISTS ix_votes_poll (poll_id),
    ADD KEY IF NOT EXISTS ix_votes_poll_yes (poll_id, will_join);

ALTER TABLE reservation
    ADD KEY IF NOT EXISTS ix_resv_room_date (classroom_id, start_at);