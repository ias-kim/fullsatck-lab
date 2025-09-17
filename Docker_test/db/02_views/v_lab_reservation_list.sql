CREATE OR REPLACE VIEW v_reservation_list AS
SELECT
    r.reservation_id,
    r.user_id,
    ua.name AS reserved_by,
    r.classroom_id,
    cr.building,
    cr.room_number,
    r.title AS reservation_title,
    r.start_at,
    r.end_at,
    r.status
FROM reservation r
         JOIN user_account ua ON ua.user_id = r.user_id
         JOIN classroom cr    ON cr.classroom_id = r.classroom_id
WHERE cr.room_type = 'LAB';

ALTER TABLE reservation
    ADD KEY IF NOT EXISTS ix_resv_room_start_end (classroom_id, start_at, end_at),
    ADD KEY IF NOT EXISTS ix_resv_status_time    (status, start_at),
    ADD KEY IF NOT EXISTS ix_resv_user_time      (user_id, start_at);

-- 겹침 체크 뷰
CREATE OR REPLACE VIEW v_reservation_conflicts AS
SELECT
    a.classroom_id, a.reservation_id AS resv_a, b.reservation_id AS resv_b,
    a.start_at AS a_start, a.end_at AS a_end, b.start_at AS b_start, b.end_at AS b_end
FROM reservation a
         JOIN reservation b
              ON a.classroom_id = b.classroom_id
                  AND a.reservation_id < b.reservation_id
                  AND a.start_at < b.end_at
                  AND b.start_at < a.end_at;